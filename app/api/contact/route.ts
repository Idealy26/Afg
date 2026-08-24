import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { siteConfig } from '@/lib/site-config'

/* ------------------------------------------------------------------ *
 * Design de l'email : un « accusé de réception » de registre commercial,
 * pas une carte SaaS. Agrofrancegasy exporte des épices et de la vanille —
 * le monde visuel emprunté est celui du document d'export : encre de
 * tampon, papier de registre, en-tête de manifeste, colonnes de valeurs.
 * Aucune image externe (bloquées par défaut dans la plupart des clients
 * mail) : tout le rendu est typographique et structurel.
 * ------------------------------------------------------------------ */

const INK = '#1c1a14' // encre
const INK_MUTED = '#6d6353' // encre délavée (libellés, méta)
const RULE = '#d9d2c0' // filet papier
const LEDGER_STRIPE = '#eef2ec' // vert de registre comptable, très pâle
const GREEN = '#1f4a37' // vert plantation — accent de lien
const STAMP = '#9c3b2a' // rouge tampon encreur

const SERIF = "'Iowan Old Style', 'Palatino Linotype', Palatino, Georgia, serif"
const MONO = "'Courier New', Courier, monospace"
const SANS = 'Arial, Helvetica, sans-serif'

/** Échappe tout ce qui vient du formulaire avant injection dans le HTML. */
function esc(value?: string) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Référence lisible dérivée de l'horodatage — affichage uniquement, non persistée. */
function buildReference(date: Date) {
  const parts = new Intl.DateTimeFormat('fr-FR', {
    timeZone: 'Indian/Antananarivo',
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(date)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '00'
  return `${get('year')}-${get('month')}${get('day')}-${get('hour')}${get('minute')}`
}

function buildHeadline(product?: string, volume?: string) {
  if (product && volume) return `${esc(product)} — ${esc(volume)}`
  if (product) return esc(product)
  if (volume) return `Volume estimé : ${esc(volume)}`
  return 'Demande de renseignements'
}

function buildSubline(name?: string, company?: string, country?: string) {
  return [name, company, country].filter(Boolean).map((v) => esc(v)).join(' · ')
}

/** Conserve les paragraphes du message ; pre-wrap n'est pas fiable sous Outlook. */
function formatMessage(message: string) {
  return esc(message)
    .split(/\n{2,}/)
    .map(
      (block) =>
        `<p style="margin:0 0 14px 0; font-family:${SANS}; font-size:15px; line-height:1.65; color:${INK};">${block.replace(
          /\n/g,
          '<br />',
        )}</p>`,
    )
    .join('')
}

function buildHtmlEmail({
  name,
  company,
  email,
  country,
  product,
  volume,
  message,
}: Record<string, string | undefined>) {
  const now = new Date()
  const reference = buildReference(now)
  const receivedAt = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Indian/Antananarivo',
  }).format(now)
  const stampDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'short',
    timeZone: 'Indian/Antananarivo',
  }).format(now)

  const headline = buildHeadline(product, volume)
  const subline = buildSubline(name, company, country)

  // Seuls les champs renseignés apparaissent dans le registre.
  const fields = [
    { label: 'Email', value: email },
    { label: 'Entreprise', value: company },
    { label: 'Pays', value: country },
    { label: 'Produit', value: product },
    { label: 'Volume', value: volume },
  ].filter((f): f is { label: string; value: string } => Boolean(f.value))

  const fieldsHtml = fields
    .map(
      (f, i) => `
        <tr>
          <td width="112" style="padding:9px 12px; background:${
            i % 2 === 0 ? '#ffffff' : LEDGER_STRIPE
          }; font-family:${MONO}; font-size:11px; letter-spacing:0.06em; text-transform:uppercase; color:${INK_MUTED}; vertical-align:top; white-space:nowrap;">
            ${esc(f.label)}
          </td>
          <td style="padding:9px 12px; background:${
            i % 2 === 0 ? '#ffffff' : LEDGER_STRIPE
          }; font-family:${SANS}; font-size:14px; line-height:1.5; color:${INK}; vertical-align:top;">
            ${esc(f.value)}
          </td>
        </tr>`,
    )
    .join('')

  const messageHtml = message
    ? formatMessage(message)
    : `<p style="margin:0; font-family:${SANS}; font-size:15px; line-height:1.65; color:${INK_MUTED};">Aucun message joint — seules les coordonnées ci-dessous ont été renseignées.</p>`

  const firstName = (name || '').trim().split(/\s+/)[0] || 'vous'

  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${headline}</title>
</head>
<body style="margin:0; padding:0; background:#ffffff;">

  <div style="display:none; max-height:0; overflow:hidden; opacity:0;">${headline} — ${subline}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#ffffff;">
    <tr>
      <td align="center" style="padding:30px 20px 40px 20px;">
        <table role="presentation" width="580" cellpadding="0" cellspacing="0" style="max-width:580px; width:100%;">

          <!-- Manifeste : marque + référence -->
          <tr>
            <td style="padding-bottom:12px; border-bottom:1px solid ${INK}; font-family:${MONO}; font-size:12px; letter-spacing:0.08em; color:${INK};">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="left" style="font-family:${MONO}; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; color:${INK};">
                    ${esc(siteConfig.name)}
                  </td>
                  <td align="right" style="font-family:${MONO}; font-size:12px; letter-spacing:0.04em; color:${INK_MUTED};">
                    N° ${reference}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Objet de la demande + tampon de réception -->
          <tr>
            <td style="padding:26px 0 4px 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="vertical-align:top;">
                    <p style="margin:0 0 6px 0; font-family:${SERIF}; font-size:23px; line-height:1.3; font-weight:bold; color:${INK};">
                      ${headline}
                    </p>
                    <p style="margin:0; font-family:${SANS}; font-size:14px; line-height:1.5; color:${INK_MUTED};">
                      ${subline}
                    </p>
                  </td>
                  <td width="92" style="vertical-align:top; text-align:right;">
                    <table role="presentation" cellpadding="0" cellspacing="0" style="margin-left:auto; transform:rotate(-7deg); -ms-transform:rotate(-7deg);">
                      <tr>
                        <td style="border:2px solid rgba(156,59,42,0.55); padding:3px;">
                          <table role="presentation" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="border:1px solid rgba(156,59,42,0.55); padding:7px 10px; text-align:center;">
                                <div style="font-family:${MONO}; font-size:10px; font-weight:bold; letter-spacing:0.08em; color:${STAMP}; line-height:1.4;">REÇU</div>
                                <div style="font-family:${MONO}; font-size:10px; letter-spacing:0.04em; color:${STAMP}; line-height:1.4; text-transform:uppercase;">${stampDate}</div>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="padding:20px 0 4px 0;">
              ${messageHtml}
            </td>
          </tr>

          <!-- Registre des coordonnées -->
          <tr>
            <td style="padding:18px 0 0 0;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${RULE};">
                ${fieldsHtml}
              </table>
            </td>
          </tr>

          <!-- Action -->
          <tr>
            <td style="padding:22px 0 0 0;">
              <a href="mailto:${esc(email)}?subject=${encodeURIComponent(
                `Re: ${headline} — réf. ${reference}`,
              )}" style="font-family:${SANS}; font-size:15px; font-weight:bold; color:${GREEN}; text-decoration:underline;">
                Répondre à ${esc(firstName)}
              </a>
            </td>
          </tr>

          <!-- Provenance -->
          <tr>
            <td style="padding:26px 0 0 0; font-family:${MONO}; font-size:11px; letter-spacing:0.02em; color:${INK_MUTED};">
              Formulaire de contact du site · reçu le ${receivedAt}
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export async function POST(request: Request) {
  console.log('--- [contact] Nouvelle requête reçue ---')

  try {
    const body = await request.json()
    const { name, company, email, country, product, volume, message } = body as Record<
      string,
      string | undefined
    >

    console.log('[contact] Données reçues:', { name, company, email, country, product, volume })

    if (!name || !email) {
      console.warn('[contact] Champs requis manquants (name ou email).')
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 })
    }

    const smtpConfig = {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      user: process.env.SMTP_USER,
      passSet: Boolean(process.env.SMTP_PASS),
    }
    console.log('[contact] Config SMTP utilisée:', smtpConfig)

    if (!smtpConfig.host || !smtpConfig.user || !smtpConfig.passSet) {
      console.error('[contact] Variables SMTP manquantes dans .env.local.')
      return NextResponse.json(
        { error: 'Configuration SMTP incomplète côté serveur.' },
        { status: 500 },
      )
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    try {
      await transporter.verify()
      console.log('[contact] Connexion SMTP vérifiée avec succès.')
    } catch (verifyError) {
      console.error('[contact] Échec de la vérification SMTP:', verifyError)
      return NextResponse.json(
        {
          error: 'Connexion au serveur SMTP impossible. Vérifiez host/port/identifiants.',
          details: String(verifyError),
        },
        { status: 500 },
      )
    }

    const now = new Date()
    const reference = buildReference(now)

    const subject = `Devis — ${[product, volume].filter(Boolean).join(', ') || 'demande'} (${
      company || name
    }) · réf. ${reference}`

    const text = [
      [product, volume].filter(Boolean).join(' — ') || 'Demande de renseignements',
      [name, company, country].filter(Boolean).join(' · '),
      '',
      message || 'Aucun message joint.',
      '',
      `Réf. ${reference}`,
      `Email : ${email}`,
      company ? `Entreprise : ${company}` : null,
      country ? `Pays : ${country}` : null,
      product ? `Produit : ${product}` : null,
      volume ? `Volume : ${volume}` : null,
    ]
      .filter((line) => line !== null)
      .join('\n')

    const html = buildHtmlEmail({ name, company, email, country, product, volume, message })

    console.log('[contact] Destinataire configuré (siteConfig.email):', siteConfig.email)

    const info = await transporter.sendMail({
      from: `"${siteConfig.name}" <${process.env.SMTP_USER}>`,
      to: siteConfig.email,
      replyTo: email,
      subject,
      text,
      html,
    })

    console.log('[contact] Email envoyé avec succès. messageId:', info.messageId)
    console.log('[contact] Réponse du serveur SMTP:', info.response)
    if (info.rejected && info.rejected.length > 0) {
      console.warn('[contact] Destinataires rejetés:', info.rejected)
    }

    return NextResponse.json({ success: true, messageId: info.messageId })
  } catch (error) {
    console.error('[contact] Erreur inattendue lors de l’envoi:', error)
    return NextResponse.json(
      { error: "Échec de l'envoi.", details: String(error) },
      { status: 500 },
    )
  }
}