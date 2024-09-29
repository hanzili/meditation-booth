"use client"

import Link from "next/link"
import { useState } from "react"
import * as Dialog from '@radix-ui/react-dialog'

const footer: any = {
  en: {
    copyright: "© 2024 Oniji. All rights reserved.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    policyContent: `
      Data Policy for Open Booth Users
      Effective Date: 2024/09/27
      At Oniji, we value your privacy and are committed to protecting your personal information. This Data Policy outlines how we collect, use, store, and protect the data collected during your meditation sessions in the Open Booth. By using the Open Booth, you agree to the terms outlined in this policy.
      1. Information We Collect
      During your meditation session, we may collect the following types of data:
      Biometric Data: EEG readings and other physiological data from the Neurosity device.
      User Feedback: Information you provide regarding your meditation experience, mood, and preferences.
      Session Data: Details about your meditation sessions, including duration and selected meditation types.
      2. Purpose of Data Collection
      The data collected will be used for the following purposes:
      To enhance and personalize your meditation experience.
      To analyze user feedback and improve the effectiveness of our meditation programs.
      To conduct research and validate the efficacy of the Open Booth meditation methodology.
      3. Data Usage
      Your data may be used in the following ways:
      Personalization: To tailor meditation sessions based on your preferences and mood.
      Research: Aggregated and anonymized data may be used for research purposes to improve our services and contribute to academic studies.
      Analytics: To track user engagement and improve the Open Booth experience.
      4. Data Security
      We take data security seriously and implement appropriate technical and organizational measures to protect your information from unauthorized access, loss, or misuse. Data is encrypted both in transit and at rest.
      5. User Consent
      By using the Open Booth, you provide your consent for us to collect and use your data as outlined in this policy. You have the right to withdraw your consent at any time by discontinuing your use of the Open Booth.
      6. User Rights
      You have the following rights regarding your data:
      The right to access your personal data.
      The right to request correction of inaccurate data.
      The right to request deletion of your data, subject to our retention policy.
      7. Data Retention
      Your data will be retained only as long as necessary to fulfill the purposes outlined in this policy or as required by law.
      8. Changes to This Policy
      We may update this Data Policy from time to time. Any changes will be posted in the Open Booth and will take effect upon your next session. We encourage you to review this policy periodically for any updates.
      9. Contact Us
      If you have any questions or concerns about this Data Policy, please contact us by email hello@oniji.ca.
      By proceeding to your meditation session, you acknowledge that you have read and understood this Data Policy and consent to the collection and use of your data as described.
    `
  },
  fr: {
    copyright: "© 2024 Oniji. Tous droits réservés.",
    privacyPolicy: "Politique de confidentialité",
    termsOfService: "Conditions d'utilisation",
    policyContent: `
      Politique de confidentialité pour les utilisateurs de Open Booth
      Date d'entrée en vigueur : 2024/09/27
      Chez Oniji, nous attachons une grande importance à votre vie privée et nous nous engageons à protéger vos informations personnelles. Cette politique de confidentialité décrit comment nous collectons, utilisons, stockons et protégeons les données collectées lors de vos sessions de méditation dans l'Open Booth. En utilisant l'Open Booth, vous acceptez les termes décrits dans cette politique.
      1. Informations que nous collectons
      Lors de votre session de méditation, nous pouvons collecter les types de données suivants :
      Données biométriques : Lectures EEG et autres données physiologiques provenant de l'appareil Neurosity.
      Retour d'utilisateur : Informations que vous fournissez concernant votre expérience de méditation, votre humeur et vos préférences.
      Données de session : Détails sur vos sessions de méditation, y compris la durée et les types de méditation sélectionnés.
      2. Objectif de la collecte de données
      Les données collectées seront utilisées aux fins suivantes :
      Pour améliorer et personnaliser votre expérience de méditation.
      Pour analyser les retours des utilisateurs et améliorer l'efficacité de nos programmes de méditation.
      Pour mener des recherches et valider l'efficacité de la méthodologie de méditation de l'Open Booth.
      3. Utilisation des données
      Vos données peuvent être utilisées de la manière suivante :
      Personnalisation : Pour adapter les sessions de méditation en fonction de vos préférences et de votre humeur.
      Recherche : Les données agrégées et anonymisées peuvent être utilisées à des fins de recherche pour améliorer nos services et contribuer à des études académiques.
      Analytique : Pour suivre l'engagement des utilisateurs et améliorer l'expérience de l'Open Booth.
      4. Sécurité des données
      Nous prenons la sécurité des données au sérieux et mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations contre tout accès non autorisé, perte ou utilisation abusive. Les données sont cryptées à la fois en transit et au repos.
      5. Consentement de l'utilisateur
      En utilisant l'Open Booth, vous consentez à ce que nous collections et utilisions vos données comme décrit dans cette politique. Vous avez le droit de retirer votre consentement à tout moment en cessant d'utiliser l'Open Booth.
      6. Droits de l'utilisateur
      Vous avez les droits suivants concernant vos données :
      Le droit d'accéder à vos données personnelles.
      Le droit de demander la correction de données inexactes.
      Le droit de demander la suppression de vos données, sous réserve de notre politique de conservation.
      7. Conservation des données
      Vos données seront conservées aussi longtemps que nécessaire pour atteindre les objectifs décrits dans cette politique ou comme requis par la loi.
      8. Modifications de cette politique
      Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Toute modification sera publiée dans l'Open Booth et prendra effet lors de votre prochaine session. Nous vous encourageons à consulter cette politique périodiquement pour toute mise à jour.
      9. Contactez-nous
      Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter par email à hello@oniji.ca.
      En poursuivant votre session de méditation, vous reconnaissez avoir lu et compris cette politique de confidentialité et consentez à la collecte et à l'utilisation de vos données comme décrit.
    `
  },
};

export default function Footer({ params }: { params: { lang: string } }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!footer[params.lang]) {
    return null
  }

  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <p className="text-xs text-muted-foreground">{footer[params.lang].copyright}</p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" onClick={() => setIsOpen(true)}>
          {footer[params.lang].privacyPolicy}
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4">
          {footer[params.lang].termsOfService}
        </Link>
      </nav>

      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background p-6 shadow-lg max-h-[80vh] overflow-y-auto w-[90vw] max-w-lg">
          <Dialog.Title className="text-lg font-semibold">Data Policy for Open Booth Users</Dialog.Title>
          <Dialog.Description className="mt-2 text-sm whitespace-pre-line">
            {footer[params.lang].policyContent}
          </Dialog.Description>
          <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(false)}>
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </Dialog.Content>
      </Dialog.Root>
    </footer>
  )
}