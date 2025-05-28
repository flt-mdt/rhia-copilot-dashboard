
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 mr-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Politique de Confidentialité</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="prose prose-gray max-w-none">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Politique de Confidentialité</h1>
            
            <p className="text-gray-600 mb-6">
              La présente Politique de confidentialité décrit la façon dont vos informations personnelles sont recueillies, 
              utilisées et partagées lorsque vous vous rendez sur https://rekrut.pro (le « Site »).
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">INFORMATIONS PERSONNELLES RECUEILLIES</h2>
            <p className="text-gray-600 mb-4">
              Lorsque vous vous rendez sur le Site, nous recueillons automatiquement certaines informations concernant votre appareil, 
              notamment des informations sur votre navigateur web, votre adresse IP, votre fuseau horaire. En outre, lorsque vous parcourez 
              le Site, nous recueillons des informations sur les pages web ou produits individuels que vous consultez, les sites web ou les 
              termes de recherche qui vous ont permis d'arriver sur le Site, ainsi que des informations sur la manière dont vous interagissez 
              avec le Site. Nous désignons ces informations collectées automatiquement sous l'appellation « Informations sur l'appareil ». 
              Nous recueillons les Informations sur l'appareil à l'aide des technologies suivantes :
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">FICHIERS TÉMOINS (COOKIES)</h2>
            <p className="text-gray-600 mb-4">
              Nous utilisons seulement des « pixels invisibles », les « balises » et les « pixels » sont des fichiers électroniques 
              qui enregistrent des informations sur la façon dont vous parcourez le Site.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">COMMENT UTILISONS-NOUS VOS INFORMATIONS PERSONNELLES ?</h2>
            <p className="text-gray-600 mb-4">
              Nous utilisons simplement vos e-mail afin de pouvoir vous prévenir de l'avancée du projet.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">PARTAGE DE VOS INFORMATIONS PERSONNELLES</h2>
            <p className="text-gray-600 mb-4">
              Nous partageons vos Informations personnelles avec des tiers qui nous aident à les utiliser aux fins décrites précédemment.
            </p>
            <p className="text-gray-600 mb-4">
              Nous utilisons Google Analytics pour mieux comprendre comment nos utilisateurs utilisent le Site – pour en savoir plus sur 
              l'utilisation de vos Informations personnelles par Google, veuillez consulter la page suivante : 
              <a href="https://www.google.com/intl/fr/policies/privacy/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                https://www.google.com/intl/fr/policies/privacy/
              </a>. 
              Vous pouvez aussi désactiver Google Analytics ici : 
              <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                https://tools.google.com/dlpage/gaoptout
              </a>.
            </p>
            <p className="text-gray-600 mb-4">
              Enfin, il se peut que nous partagions aussi vos Informations personnelles pour respecter les lois et règlementations applicables, 
              répondre à une assignation, à un mandat de perquisition ou à toute autre demande légale de renseignements que nous recevons, 
              ou pour protéger nos droits.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">PUBLICITÉ COMPORTEMENTALE</h2>
            <p className="text-gray-600 mb-4">
              Comme indiqué ci-dessus, nous utilisons vos Informations personnelles pour vous proposer des publicités ciblées ou des messages 
              de marketing qui, selon nous, pourraient vous intéresser. Pour en savoir plus sur le fonctionnement de la publicité ciblée, 
              vous pouvez consulter la page d'information de la Network Advertising Initiative (NAI) à l'adresse suivante : 
              <a href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
              </a>. 
              Vous pouvez refuser la publicité ciblée ici :
            </p>
            <ul className="list-disc list-inside text-gray-600 mb-4 ml-4">
              <li>
                FACEBOOK – 
                <a href="https://www.facebook.com/settings/?tab=ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://www.facebook.com/settings/?tab=ads
                </a>
              </li>
              <li>
                GOOGLE - 
                <a href="https://www.google.com/settings/ads/anonymous" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://www.google.com/settings/ads/anonymous
                </a>
              </li>
              <li>
                BING – 
                <a href="https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                  https://about.ads.microsoft.com/fr-fr/ressources/politiques/annonces-
                </a>
              </li>
            </ul>
            <p className="text-gray-600 mb-4">
              En outre, vous pouvez refuser certains de ces services en vous rendant sur le portail de désactivation de Digital Advertising Alliance 
              à l'adresse suivante 
              <a href="https://optout.aboutads.info/?c=3&lang=fr" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                https://optout.aboutads.info/?c=3&lang=fr
              </a>.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">VOS DROITS</h2>
            <p className="text-gray-600 mb-4">
              Si vous êtes résident(e) européen(ne), vous disposez d'un droit d'accès aux informations personnelles que nous détenons à votre sujet 
              et vous pouvez demander à ce qu'elles soient corrigées, mises à jour ou supprimées. Si vous souhaitez exercer ce droit, 
              veuillez nous contacter au moyen des coordonnées précisées ci-dessous. Par ailleurs, si vous êtes résident(e) européen(ne), 
              notez que nous traitons vos informations dans le but de remplir nos obligations contractuelles à votre égard 
              (par exemple si vous passez une commande sur le Site) ou de poursuivre nos intérêts commerciaux légitimes, énumérés ci-dessus.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">RÉTENTION DES DONNÉES</h2>
            <p className="text-gray-600 mb-4">
              Lorsque vous passez une commande par l'intermédiaire du Site, nous conservons les Informations sur votre commande dans nos dossiers, 
              sauf si et jusqu'à ce que vous nous demandiez de les supprimer.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">MINEURS</h2>
            <p className="text-gray-600 mb-4">
              Le Site n'est pas destiné aux individus de moins de 16 ans.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">CHANGEMENTS</h2>
            <p className="text-gray-600 mb-4">
              Nous pouvons être amenés à modifier la présente politique de confidentialité de temps à autre afin d'y refléter, 
              par exemple, les changements apportés à nos pratiques ou pour d'autres motifs opérationnels, juridiques ou réglementaires 
              à nos pratiques ou pour d'autres motifs opérationnels, juridiques ou réglementaires.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">NOUS CONTACTER</h2>
            <p className="text-gray-600 mb-4">
              Pour en savoir plus sur nos pratiques de confidentialité, si vous avez des questions ou si vous souhaitez déposer une réclamation, 
              veuillez nous contacter par e-mail à : 
              <a href="mailto:contact@rekrut.pro" className="text-blue-600 hover:underline">
                contact@rekrut.pro
              </a>, 
              ou par courrier à l'adresse suivante :
            </p>
            <div className="bg-gray-50 p-4 rounded-lg text-gray-600">
              <p className="font-medium">9 RUE EDGAR FAURE</p>
              <p>PARIS, Île de France, 75015</p>
              <p>France</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
