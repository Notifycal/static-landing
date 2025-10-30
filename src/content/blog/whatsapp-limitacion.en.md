---
title: The limitations that make WhatsApp unfeasible for most businesses
image: '/images/posts/whatsapp-lock.webp'
author: Notifycal
date: 2024-11-02T10:00:00Z
categories: ['technology', 'communication']
draft: false
---

WhatsApp is the world's most popular messaging app. With billions of active users, it seems like the obvious choice for any automated reminder service. So why doesn't Notifycal offer WhatsApp integration? The answer has to do with how Meta has designed WhatsApp Business Platform.

### The main problem: your number gets hijacked

To send automated messages through WhatsApp, businesses must use **WhatsApp Business Platform** (the business API), which is completely different from the WhatsApp Business app you can download on your phone.

Here comes the most serious problem: **when you register a phone number on WhatsApp Business Platform, that number becomes completely locked for normal use**.

Once registered:

- You cannot use that number on personal WhatsApp
- You cannot use that number on the WhatsApp Business app
- You cannot access it from WhatsApp Web
- You cannot see or reply to messages from your phone

The number is literally hijacked. The only way to interact with it is through CRM systems or third-party applications. Meta provides no native interface, which means if a customer replies to a reminder, you won't see that message in your WhatsApp. You need to hire an additional CRM just to be able to read the replies.

### The costs are significant

Although WhatsApp Business Platform offers 1,000 free conversations per month, costs accumulate afterwards. Since July 2025, WhatsApp charges per message sent, with prices varying according to:

- **The message category**: Marketing, utility, or authentication
- **The recipient's country**: The differences are enormous

For example, sending marketing messages to India costs approximately €0.01 per message, while sending them to Germany costs approximately €0.13, almost 13 times more. For a service that sends thousands of daily reminders, these costs multiply exponentially.

You can check the <a href="https://business.whatsapp.com/products/platform-pricing?country=Espa%C3%B1a&currency=Euro%20(EUR)&category=Utilidad" target="_blank" rel="noopener noreferrer">official WhatsApp Business Platform prices in Spain</a> to see detailed rates by country and category. For more detailed technical information, check the <a href="https://developers.facebook.com/docs/whatsapp/pricing/?translation&locale=es_ES" target="_blank" rel="noopener noreferrer">developer documentation</a>.

### Other important limitations

**Messaging limits**: Unverified accounts are limited to 250 conversations in 24 hours. After verification, you can reach up to 1,000 unique customers per day.

**Template approval**: All messages must follow templates pre-approved by Meta. You cannot send free text, each template must go through a review process.

**Business verification**: To scale you need to verify your business with Meta, a process that can take from minutes to 14 days.

### Who is WhatsApp Business Platform for?

This platform makes sense for:

- Large companies with dedicated teams already using sophisticated CRMs
- Organizations that can dedicate phone numbers exclusively for the platform
- Companies with communication budgets of several thousand euros per month
- Corporations with technical teams capable of managing the integration

For small and medium-sized businesses, the barriers are too high.

### Why Notifycal chooses SMS and RCS

At Notifycal we bet on channels that:

- Work with any phone number without hijacking it
- Don't require specific apps installed
- Have predictable and transparent pricing
- Allow bidirectional responses without intermediary systems
- Give real control to the user

WhatsApp Business Platform requires our users to get an additional number, lose access to that number from their devices, hire additional CRMs just to see replies, and pay variable costs depending on the destination country. We don't want to impose those limitations.

### Conclusion

The decision not to integrate WhatsApp Business Platform is not due to lack of technical capability. It's a conscious decision based on offering accessible solutions for the majority of our users.

That said, if your organization has the needs and resources to take advantage of WhatsApp Business Platform, and you're interested in us implementing this integration, <a href="https://www.instagram.com/notifycal/">contact us for more information</a> and we'll study it. Each case is different, and we'll be happy to evaluate if it makes sense for your specific situation.
