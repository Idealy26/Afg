import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { siteConfig } from '@/lib/site-config'

function buildHtmlEmail({
  name,
  company,
  email,
  country,
  product,
  volume,
  message,
}: Record<string, string | undefined>) {
  const rows = [
    { label: 'Nom complet', value: name },
    { label: 'Entreprise', value: company || '—' },
    { label: 'Email', value: email },
    { label: 'Pays', value: country || '—' },
    { label: "Produit d'intérêt", value: product || '—' },
    { label: 'Volume estimé', value: volume || '—' },
  ]

  const rowsHtml = rows
    .map(
      (row, i) => `
        <tr>
          <td style="padding:14px 20px; background:${i % 2 === 0 ? '#faf6ef' : '#ffffff'}; border-bottom:1px solid #ece3d3; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#8a7a5a; width:38%; vertical-align:top;">
            ${row.label}
          </td>
          <td style="padding:14px 20px; background:${i % 2 === 0 ? '#faf6ef' : '#ffffff'}; border-bottom:1px solid #ece3d3; font-family:Arial,Helvetica,sans-serif; font-size:14px; color:#2e2013; vertical-align:top;">
            ${row.value}
          </td>
        </tr>`,
    )
    .join('')

  return `
  <!DOCTYPE html>
  <html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Nouvelle demande de devis</title>
  </head>
  <body style="margin:0; padding:0; background-color:#ede4d3; font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#ede4d3; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%; background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 4px 24px rgba(46,32,19,0.12);">

            <!-- Header -->
            <tr>
              <td style="background:#2e2013; padding:32px 28px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td align="left">
                      <span style="display:inline-block; height:2px; width:28px; background:#caa460; vertical-align:middle; margin-right:10px;"></span>
                      <span style="font-family:Arial,Helvetica,sans-serif; font-size:11px; font-weight:700; letter-spacing:0.18em; text-transform:uppercase; color:#caa460; vertical-align:middle;">
                        ${siteConfig.name}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding-top:14px;">
                      <span style="font-family:Georgia,'Times New Roman',serif; font-size:24px; font-weight:600; color:#f5ecd9;">
                        Nouvelle demande de devis
                      </span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Details table -->
            <tr>
              <td style="padding:0;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${rowsHtml}
                </table>
              </td>
            </tr>

            <!-- Message -->
            <tr>
              <td style="padding:24px 28px 8px 28px;">
                <p style="margin:0 0 8px 0; font-family:Arial,Helvetica,sans-serif; font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:#8a7a5a;">
                  Message
                </p>
                <p style="margin:0; font-family:Arial,Helvetica,sans-serif; font-size:14px; line-height:1.6; color:#2e2013; white-space:pre-wrap;">
                  ${message ? message.replace(/</g, '&lt;').replace(/>/g, '&gt;') : '(aucun message)'}
                </p>
              </td>
            </tr>

            <!-- CTA reply -->
            <tr>
              <td style="padding:24px 28px 32px 28px; border-bottom-left-radius:16px; border-bottom-right-radius:16px;">
                <a href="mailto:${email}" style="display:inline-block; background:#caa460; color:#2e2013; font-family:Arial,Helvetica,sans-serif; font-size:14px; font-weight:700; text-decoration:none; padding:12px 24px; border-radius:999px;">
                  Répondre à ${name}
                </a>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
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

    const subject = `Demande de devis — ${company || name}`

    const text = [
      `Nom complet: ${name}`,
      `Entreprise: ${company || '-'}`,
      `Email: ${email}`,
      `Pays: ${country || '-'}`,
      `Produit d'intérêt: ${product || '-'}`,
      `Volume estimé: ${volume || '-'}`,
      '',
      message || '(aucun message)',
    ].join('\n')

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