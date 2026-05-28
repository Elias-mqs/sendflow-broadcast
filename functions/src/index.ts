import { onSchedule } from 'firebase-functions/v2/scheduler'
import { getFirestore, Timestamp } from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'

initializeApp()

const db = getFirestore()

export const processScheduledMessages = onSchedule(
  { schedule: 'every 1 minutes', timeZone: 'America/Sao_Paulo' },
  async () => {
    const now = Timestamp.now()

    const snapshot = await db
      .collection('messages')
      .where('status', '==', 'scheduled')
      .where('scheduledAt', '<=', now)
      .get()

    if (snapshot.empty) return

    const batch = db.batch()

    snapshot.docs.forEach((doc) => {
      batch.update(doc.ref, {
        status: 'sent',
        sentAt: now,
      })
    })

    await batch.commit()
  }
)
