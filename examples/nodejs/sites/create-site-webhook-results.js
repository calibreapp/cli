import { Integration, Site, Snapshot } from 'calibre'

const TEAM_SLUG = 'my-team-slug'
const WEBHOOK_URL = 'https://example.com/webhook'

const createSiteWithWebhookCallback = async () => {
  try {
    const site = await Site.create({
      agentSettings: { location: 'NorthVirginia' },
      name: `${Date.now()}-webhook-test`,
      pages: [
        {
          name: 'Calibre',
          url: 'https://calibreapp.com'
        }
      ],
      team: TEAM_SLUG,
      testProfiles: [
        {
          name: 'Chrome Desktop',
          device: 'Desktop'
        }
      ]
    })

    const integration = await Integration.create({
      site: site.slug,
      provider: 'webhook',
      events: ['new_snapshot'],
      url: WEBHOOK_URL
    })

    const snapshot = await Snapshot.create({
      site: site.slug
    })

    console.log({ site, integration, snapshot })
  } catch (err) {
    console.log(err)
  }
}

createSiteWithWebhookCallback()
