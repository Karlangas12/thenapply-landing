# Terms of Service

**Then Apply — Web to Markdown API**

Last updated: August 9, 2026

These Terms of Service (the "Terms") form a binding agreement between you and
Carlos Fuentes Navarro, an individual residing in Spain, trading as **Then
Apply** (the "Provider", "we", "us"). By requesting an API Key, subscribing to
a plan, or issuing any request to the Service, you accept these Terms in full.
If you do not accept them, do not use the Service.

---

## 1. Definitions

- **Service** — the Then Apply software-as-a-service platform operated at
  `thenapply.dev`, including the **Web to Markdown** API, its endpoints,
  documentation, dashboards, and any successor or additional product the
  Provider makes available under the Then Apply brand.
- **Customer** — the natural or legal person that subscribes to a plan, is
  issued an API Key, or otherwise uses the Service. Where the Customer is an
  organization, the individual accepting these Terms warrants that they are
  authorized to bind that organization.
- **API Key** — the secret credential issued to a Customer that authenticates
  requests to the Service and identifies the plan and quota attached to them.
- **Content** — any input the Customer submits to the Service (URLs, raw HTML,
  parameters) and any output the Service returns in response (Markdown,
  metadata, error payloads).
- **Plan** — the tier of the Service the Customer has subscribed to, which
  determines the applicable request quota and features.

## 2. Licence granted to the Customer

Subject to the Customer's continued compliance with these Terms and payment of
the applicable fees, the Provider grants the Customer a **non-exclusive,
non-transferable, non-sublicensable, revocable and limited right** to access
and use the Service, solely through the Customer's own API Key and solely
within the quota of the Customer's Plan, for the Customer's internal business
purposes or for incorporation into the Customer's own end products.

This is a licence to *use* the Service, not a sale of it. No rights are granted
other than those expressly stated here.

### 2.1. Prohibited uses

The Customer shall not, and shall not permit any third party to:

**(a) Resell or wrap the Service.** Resell, sublicense, rent, lease, or
otherwise make the Service available to third parties as a standalone offering,
nor wrap the Service — with or without a thin layer of the Customer's own code
— in a product that competes with the Service or that substantially reproduces
its functionality. Incorporating the Service as a component of a broader
product that provides substantial independent value is permitted; re-exposing
the API, in whole or in substance, is not.

**(b) Reverse engineer the Service.** Reverse engineer, decompile, disassemble,
or otherwise attempt to derive the source code, underlying algorithms, model
prompts, or internal architecture of the Service, except to the extent such
restriction is expressly prohibited by applicable mandatory law.

**(c) Share the API Key.** Disclose, publish, transfer, or share an API Key
with any third party, or use a single API Key across unrelated organizations.
The Customer is solely responsible for keeping the API Key confidential and for
**all** activity carried out with it, whether authorized by the Customer or not.

**(d) Exceed the contracted quota.** Attempt to circumvent, evade, or defeat
rate limiting, quota enforcement, authentication, or any other technical
control of the Service — including by rotating keys, distributing traffic
across multiple accounts, or any equivalent technique — in order to obtain
service beyond the Plan the Customer has paid for.

The Customer shall further not use the Service to fetch, process, or
redistribute content the Customer is not authorized to access, nor in any
manner that abuses, degrades, or endangers the Service or the third-party sites
it fetches from.

## 3. API Keys

API Keys are displayed in plain text **once only**, at the moment of issuance.
The Provider stores only a cryptographic hash of the Key and is therefore
technically unable to recover a lost Key; a lost Key must be revoked and
replaced. The Customer must notify the Provider without undue delay if an API
Key is or may be compromised.

## 4. Plans, billing, and Merchant of Record

Subscriptions and payments are processed entirely by **Polar.sh**, which acts
as **Merchant of Record** for all purchases made through the Service. Polar
processes payment, issues invoices and receipts, and is the counterparty to the
sale transaction itself. The Provider never receives or stores card details.
Billing enquiries, refunds, invoice corrections, and subscription changes are
handled through Polar's checkout and customer portal, or via the support
contacts in section 11.

When Polar confirms a subscription or purchase, the Service automatically
issues an API Key (for new Customers) or updates the Plan attached to an
existing Key. Delivery of the Key by email may take a short time after
checkout and is not always instantaneous.

## 5. Content and intellectual property

### 5.1. Ownership of the Service

The Service, its source code, its underlying software, its documentation, its
visual design, and the **Then Apply** and **Web to Markdown** names and marks
are and remain the exclusive property of the Provider, Carlos Fuentes Navarro.
All rights not expressly granted in section 2 are reserved. **Nothing in these
Terms transfers, assigns, or grants any ownership interest** in the Service or
in any intellectual property right of the Provider to the Customer.

Where components of the Service are distributed separately under an open source
licence (for example, the `web-to-markdown` npm package), that licence governs
those components in their distributed form. It does not grant any right over
the hosted Service, its infrastructure, or the marks.

### 5.2. Ownership of Content

As between the parties, the Customer retains all rights in the input it submits
and in the output the Service returns to it. The Provider claims no ownership
over Customer Content and uses it only to the extent necessary to operate the
Service and to comply with the law. The Customer warrants that it holds the
rights necessary to submit its input and that doing so does not infringe the
rights of any third party.

## 6. Suspension and termination

The Provider may **suspend or revoke any API Key with immediate effect** where
the Customer breaches these Terms — in particular section 2.1 — or where the
Customer's use abuses, degrades, or endangers the Service, its infrastructure,
or third-party sites. Where circumstances reasonably permit, the Provider will
give prior notice and an opportunity to cure; where the breach is serious or
ongoing, it may act first and notify afterwards.

**Termination for breach does not entitle the Customer to a refund of any
period already invoiced.** The Customer may cancel a subscription at any time
through Polar; cancellation takes effect at the end of the current billing
period, and access continues until then. Sections 5, 7, 8, 9 and 10 survive
termination.

## 7. Availability

**Nothing in this section excludes or limits any right or remedy that
applicable mandatory law grants to consumers**, including any statutory right
to have the Service supplied and kept in conformity with the contract.

The Provider will use reasonable efforts to keep the Service available and
functioning as described in its public documentation. The Provider does **not**
currently publish a Service Level Agreement: availability is offered on a
**best-effort** basis, with no committed uptime, no committed response time,
and no service credits. Should the Provider publish an SLA, that document will
govern availability from its stated effective date and will prevail over this
section to the extent of any conflict.

The Service may be temporarily unavailable for maintenance, for the correction
of faults, or because of failures in the third-party infrastructure on which it
depends. Where an interruption is planned and advance notice is reasonably
practicable, the Provider will give it.

The Provider does not warrant that the Service will be uninterrupted or
error-free, nor that Markdown output will be accurate or complete for every
page converted: conversion quality depends on the structure of the source page
being fetched, which the Provider does not control. This describes what the
Service does; it is not a waiver of the Provider's obligation to supply it.

Where the Customer is a consumer within the meaning of Spanish or European
Union law, unavailability that amounts to non-conformity of the Service gives
rise to the statutory remedies preserved in section 9.1, whatever this section
says.

## 8. Warranties and disclaimers

**Nothing in these Terms excludes or limits any warranty, right, or remedy that
cannot lawfully be excluded or limited**, including the statutory rights of
consumers under Spanish and European Union law and, in particular, the right to
receive a digital service that conforms to the contract.

### 8.1. What the Provider warrants

The Provider warrants that it will supply the Service with reasonable skill and
care, and that the Service will perform substantially as described in its
then-current public documentation.

### 8.2. What the Provider does not warrant

Subject to section 8.1 and section 8.3, and to the fullest extent permitted by
applicable law, the Service is provided without further warranties, whether
express or implied, including warranties of merchantability, fitness for a
particular purpose, accuracy, and non-infringement.

Where the Customer does not act as a consumer within the meaning of Spanish or
European Union law, this exclusion extends to warranties implied by statute, to
the fullest extent applicable law allows.

### 8.3. Consumers

Where the Customer is a consumer within the meaning of Spanish or European
Union law, nothing in this section excludes or limits the conformity
requirements that applicable law imposes on digital services, or any remedy
available for non-conformity. The Provider does not disclaim statutory
warranties towards consumers.

## 9. Limitation of liability

**Nothing in these Terms excludes or limits any liability, right, or remedy
that cannot lawfully be excluded or limited under applicable law.** In
particular, nothing in this section affects the mandatory rights and remedies
available to consumers under Spanish or European Union consumer protection law,
or the Provider's obligations under data protection law. Where any part of this
section is held unenforceable, the remainder continues to apply.

Subject to that, the Provider's liability in connection with the Service is
limited as set out below.

### 9.1. Losses excluded

To the fullest extent permitted by applicable law, the Provider shall not be
liable for indirect, incidental, special, consequential, or punitive damages,
nor for loss of profits, revenue, data, business, goodwill, or other similar
economic loss, arising out of or in connection with the Service, even if the
Provider has been advised of the possibility of such loss.

Where the Customer is a consumer within the meaning of Spanish or European
Union law, this exclusion applies only to the extent permitted by applicable
mandatory law, and in any event does not exclude or limit:

- liability for direct loss caused by the Provider's failure to perform, or
  defective performance of, its obligations under these Terms; or
- any statutory right or remedy the consumer has in respect of non-conformity
  of the Service, including any right to have the Service brought into
  conformity, to a reduction in price, to terminate the contract, or to a
  refund.

### 9.2. Third-party services and content

The Service converts content that the **Customer** directs it to fetch or that
the Customer submits directly. The Provider does not select, control, verify,
or endorse that content, and shall not be liable for it, nor for the Customer's
lack of authorization to access or process it.

As stated in section 4, Polar.sh acts as Merchant of Record and is the
counterparty to the sale transaction itself; billing, invoicing, and refund
processing are therefore governed by Polar's own terms.

The Provider shall not be liable for the acts or omissions of independent
third-party providers on which the Service depends. This does **not** limit the
Provider's liability where the loss results from the Provider's own breach of
these Terms, from its own negligence in selecting or operating those providers,
or from any obligation the Provider owes under data protection law in respect
of processors acting on its behalf.

### 9.3. Aggregate cap — Customers acting as a business

Where the Customer does not act as a consumer within the meaning of Spanish or
European Union law, the Provider's aggregate liability arising out of or in
connection with these Terms or the Service shall not exceed the total amount
actually paid by the Customer for the Service during the **twelve (12) months**
immediately preceding the event giving rise to the claim.

### 9.4. Customers who are consumers

Where the Customer is a consumer within the meaning of Spanish or European
Union law, the cap in section 9.3 does **not** apply. The Provider's liability
towards a consumer is instead determined by applicable law, limited — to the
extent that law permits — to loss that was foreseeable at the time the contract
was entered into and that is a direct consequence of the Provider's breach.

**No provision of these Terms shall be interpreted as reducing the Provider's
liability towards a consumer below the level required by applicable mandatory
law, and this applies equally whether or not the consumer pays for the
Service.**

### 9.5. Liability that is never excluded or limited

Nothing in these Terms excludes or limits the Provider's liability for:

- wilful misconduct or gross negligence;
- death or personal injury;
- fraud or fraudulent misrepresentation;
- damage caused by infringement of data protection law, including any right to
  compensation under the General Data Protection Regulation;
- any statutory remedy for non-conformity owed to a consumer, including any
  refund due by law; or
- any other liability that applicable mandatory law does not permit the
  Provider to exclude or limit.

## 10. Governing law and jurisdiction

These Terms are governed by the laws of **Spain**, excluding its conflict of
law rules and the United Nations Convention on Contracts for the International
Sale of Goods.

Where the Customer acts as a business, the parties submit to the exclusive
jurisdiction of the **courts of Spain**. Where the Customer is a consumer
within the meaning of Spanish or European Union law, this clause does not
deprive the Customer of the protection of the mandatory provisions of the law
of their country of residence, nor of the right to bring proceedings before the
courts competent under those provisions.

## 11. Changes to these Terms

The Provider may update these Terms. For **material** changes — those that
meaningfully reduce the Customer's rights or increase its obligations — the
Provider will notify active Customers **by email at least thirty (30) days
before** the change takes effect. A Customer who does not accept a material
change may cancel their subscription before the effective date; continued use
of the Service after that date constitutes acceptance.

Non-material changes (clarifications, corrections, updated contact details)
take effect on publication, with the date at the top of this document updated
accordingly.

## 12. Contact

- Account and billing: <carlosfu.invers@gmail.com> (temporary address while a
  dedicated support inbox is set up)
- Bugs and technical issues: <https://github.com/Karlangas12/web-to-markdown/issues>

---

A Spanish translation of this document is available at
[`TERMS_OF_SERVICE.es.md`](./TERMS_OF_SERVICE.es.md) and at `/terminos`. It is
provided for convenience, and **this English version is the reference text**:
in the event of a discrepancy between the two, the English version prevails for
the purposes of interpreting these Terms.

**This language clause is not absolute.** Where the Customer is a consumer
whose mandatory rights derive from the law of a country of residence other than
that of the reference text, those rights prevail over this clause to the extent
of any conflict. Nothing in this clause may be relied on to deprive such a
consumer of a protection that cannot be waived by contract, nor to make the
English text binding where applicable mandatory law requires otherwise.
