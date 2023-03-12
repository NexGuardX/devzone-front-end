import { Button, Center, Text } from '@chakra-ui/react';
import { MdLanguage } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function LegalNotice() {
  return (
    <Center>
      <Text textAlign="center" w="70%">
        <Text as="b">
          MENTIONS LEGALES :
          <NavLink to="/legal-notice-en">
            <Button rightIcon={<MdLanguage />} variant="outline">
              En
            </Button>
          </NavLink>
        </Text>
        <br />
        <br />
        <Text>
          Conform&eacute;ment aux dispositions des articles 6-III et 19 de la Loi n&deg; 2004-575 du
          21 juin 2004 pour la Confiance dans l&#39;&eacute;conomie num&eacute;rique, dite L.C.E.N.,
          nous portons &agrave; la connaissance des utilisateurs et visiteurs du site :
          <Text>www.dzone.dev les informations suivantes :</Text>
          <br />
          <Text as="b">1. Informations l&eacute;gales :</Text>
          <br />
          <br />
          <Text>
            Statut du propri&eacute;taire : <strong>particulier</strong>
            <br />
            Le Propri&eacute;taire est : <strong>Abdelkarim MEHIAOUI</strong>
            <br />
            &nbsp;
            <br />
            Le Cr&eacute;ateur du site est : <strong>Abdelkarim MEHIAOUI</strong>
            <br />
            Le Responsable de la&nbsp; publication est : <strong>Azouaou BENADDA</strong>
            <br />
            Contacter le responsable de la publication :{' '}
            <strong>devzoneapplication@gmail.com</strong>
            <br />
            Le responsable de la publication est une<strong>&nbsp;personne physique</strong>
            <br />
            <br />
            Le Webmaster est&nbsp; : <strong>Abdelkarim MEHIAOUI</strong>
            <br />
            Contacter le Webmaster :&nbsp;{' '}
            <strong>
              <a href="mailto:devzoneapplication@gmail.com?subject=Contact a partir des mentions lÃ©gales via le site www.dzone.dev">
                devzoneapplication@gmail.com
              </a>
            </strong>
            <br />
            L&rsquo;hebergeur du site est :{' '}
            <strong>O2Switch 222 Boulevard Gustave Flaubert 63000 Clermont-Ferrand</strong>
            <br />
          </Text>
          <Text>&nbsp;</Text>
          <Text>
            <strong>2. Pr&eacute;sentation et principe :</strong>
          </Text>
          <br />
          <Text>
            Est d&eacute;sign&eacute; ci-apr&egrave;s : <strong>Utilisateur</strong>, tout
            internaute se connectant et utilisant le site susnomm&eacute; :{' '}
            <a href="http://www.dzone.dev" target="_blank" rel="noreferrer">
              www.dzone.dev
            </a>
            .<br />
            Le site <strong>www.dzone.dev</strong>
            <strong> </strong>regroupe un ensemble de services, dans l&#39;&eacute;tat,&nbsp; mis
            &agrave; la disposition des utilisateurs. Il est ici pr&eacute;cis&eacute; que ces
            derniers doivent rester courtois et faire preuve de bonne foi tant envers les autres
            utilisateurs qu&#39;envers le webmaster du site www.dzone.dev. Le site www.dzone.dev est
            mis &agrave; jour r&eacute;guli&egrave;rement par Abdelkarim MEHIAOUI.
            <br />
            Abdelkarim MEHIAOUI s&rsquo;efforce de fournir sur le site www.dzone.dev des
            informations les plus pr&eacute;cises possibles (sous r&eacute;serve de modifications
            apport&eacute;es depuis leur mise en ligne), mais ne saurait garantir l&#39;exactitude,
            la compl&eacute;tude et l&#39;actualit&eacute; des informations diffus&eacute;es sur son
            site, qu&rsquo;elles soient de son fait ou du fait des tiers partenaires qui lui
            fournissent ces informations. En cons&eacute;quence, l&#39;utilisateur reconna&icirc;t
            utiliser ces informations donn&eacute;es (&agrave; titre indicatif, non exhaustives et
            susceptibles d&#39;&eacute;voluer) sous sa responsabilit&eacute; exclusive.
          </Text>
          <Text>&nbsp;</Text>
          <Text>
            <strong>3. Accessibilit&eacute; :</strong>
            <br />
            <br />
            Le site www.dzone.dev est par principe accessible aux utilisateurs 24/24h, 7/7j, sauf
            interruption, programm&eacute;e ou non, pour les besoins de sa maintenance ou en cas de
            force majeure. En cas d&rsquo;impossibilit&eacute; d&rsquo;acc&egrave;s au service,
            www.dzone.dev s&rsquo;engage &agrave; faire son maximum afin de r&eacute;tablir
            l&rsquo;acc&egrave;s au service et s&rsquo;efforcera alors de communiquer
            pr&eacute;alablement aux utilisateurs les dates et heures de l&rsquo;intervention.&nbsp;
            N&rsquo;&eacute;tant soumis qu&rsquo;&agrave; une obligation de moyen, www.dzone.dev ne
            saurait &ecirc;tre tenu pour responsable de tout dommage, quelle qu&rsquo;en soit la
            nature, r&eacute;sultant d&rsquo;une indisponibilit&eacute; du service.
          </Text>
          <Text>&nbsp;</Text>
          <Text>
            <strong>4. Propri&eacute;t&eacute; intellectuelle :</strong>
          </Text>
          <Text>
            <br />
            Abdelkarim MEHIAOUI est propri&eacute;taire exclusif de tous les droits de
            propri&eacute;t&eacute; intellectuelle ou d&eacute;tient les droits d&rsquo;usage sur
            tous les &eacute;l&eacute;ments accessibles sur le site, tant sur la structure que sur
            les textes, images, graphismes, logo, ic&ocirc;nes, sons, logiciels&hellip;
            <br />
            Toute reproduction totale ou partielle du site www.dzone.dev, repr&eacute;sentation,
            modification, publication, adaptation totale ou partielle de l&#39;un quelconque de ces
            &eacute;l&eacute;ments, quel que soit le moyen ou le proc&eacute;d&eacute;
            utilis&eacute;, est interdite, sauf autorisation &eacute;crite pr&eacute;alable de
            Abdelkarim MEHIAOUI, propri&eacute;taire du site &agrave; l&#39;email :
            devzoneapplication@gmail.com, &agrave; d&eacute;faut elle sera consid&eacute;r&eacute;e
            comme constitutive d&rsquo;une contrefa&ccedil;on et passible de poursuite
            conform&eacute;ment aux dispositions des articles L.335-2 et suivants du Code de
            Propri&eacute;t&eacute; Intellectuelle.
          </Text>
          <br />
          <Text as="b">5. Liens hypertextes et cookies :</Text>
          <br />
          <br />
          <Text>
            Le site www.dzone.dev contient un certain nombre de liens hypertextes vers
            d&rsquo;autres sites (partenaires, informations &hellip;) mis en place avec
            l&rsquo;autorisation de Abdelkarim MEHIAOUI. Cependant, Abdelkarim MEHIAOUI n&rsquo;a
            pas la possibilit&eacute; de v&eacute;rifier l&#39;ensemble du contenu des sites ainsi
            visit&eacute;s&nbsp;et d&eacute;cline donc toute responsabilit&eacute; de ce fait quand
            aux risques &eacute;ventuels de contenus illicites.
            <br />
            L&rsquo;utilisateur est inform&eacute; que lors de ses visites sur le site
            www.dzone.dev, un ou des cookies sont susceptibles de s&rsquo;installer automatiquement
            sur son ordinateur par l&#39;interm&eacute;diaire de son logiciel de navigation. Un
            cookie est un bloc de donn&eacute;es qui ne permet pas d&#39;identifier
            l&#39;utilisateur, mais qui enregistre des informations relatives &agrave; la navigation
            de celui-ci sur le site.&nbsp;
            <br />
            Le param&eacute;trage du logiciel de navigation permet d&rsquo;informer de la
            pr&eacute;sence de cookie et &eacute;ventuellement, de la refuser de la mani&egrave;re
            d&eacute;crite &agrave; l&rsquo;adresse suivante :{' '}
            <a href="http://www.cnil.fr">www.cnil.fr</a>. L&rsquo;utilisateur peut toutefois
            configurer le navigateur de son ordinateur pour refuser l&rsquo;installation des
            cookies, sachant que le refus d&#39;installation d&#39;un cookie peut entra&icirc;ner
            l&rsquo;impossibilit&eacute; d&rsquo;acc&eacute;der &agrave; certains services. Pour
            tout bloquage des cookies, tapez dans votre moteur de recherche : bloquage des cookies
            sous IE ou firefox et suivez les instructions en fonction de votre version.
          </Text>
          <Text>
            <br />
            <strong>
              6. Protection des biens et des personnes - gestion des donn&eacute;es personnelles :
            </strong>
            <br />
            <br />
            En France, les donn&eacute;es personnelles sont notamment prot&eacute;g&eacute;es par la
            loi n&deg; 78-87 du 6 janvier 1978, la loi n&deg; 2004-801 du 6 ao&ucirc;t 2004,
            l&#39;article L. 226-13 du Code p&eacute;nal et la Directive Europ&eacute;enne du 24
            octobre 1995.
          </Text>
          <Text>
            Sur le site www.dzone.dev, Abdelkarim MEHIAOUI ne collecte des informations personnelles
            ( suivant l&#39;article 4 loi n&deg;78-17 du 06 janvier 1978) relatives &agrave;
            l&#39;utilisateur que pour le besoin de certains services propos&eacute;s par le site
            www.dzone.dev. L&#39;utilisateur fournit ces informations en toute connaissance de
            cause, notamment lorsqu&#39;il proc&egrave;de par lui-m&ecirc;me &agrave; leur saisie.
            Il est alors pr&eacute;cis&eacute; &agrave; l&#39;utilisateur du site www.dzone.dev
            l&rsquo;obligation ou non de fournir ces informations.
            <br />
            Conform&eacute;ment aux dispositions des articles 38 et suivants de la loi 78-17 du 6
            janvier 1978 relative &agrave; l&rsquo;informatique, aux fichiers et aux
            libert&eacute;s, tout utilisateur dispose d&rsquo;un droit d&rsquo;acc&egrave;s, de
            rectification, de suppression et d&rsquo;opposition aux donn&eacute;es personnelles le
            concernant. Pour l&rsquo;exercer, adressez votre demande &agrave; www.dzone.dev par
            email :{' '}
            <strong>
              <a href="mailto:devzoneapplication@gmail.com?subject=Contact ï¿½ partir des mentions lï¿½gales via le site www.dzone.dev">
                devzoneapplication@gmail.com
              </a>
            </strong>{' '}
            ou&nbsp;par &eacute;crit&nbsp;d&ucirc;ment sign&eacute;e, accompagn&eacute;e d&rsquo;une
            copie du titre d&rsquo;identit&eacute; avec signature du titulaire de la pi&egrave;ce,
            en pr&eacute;cisant l&rsquo;adresse &agrave; laquelle la r&eacute;ponse doit &ecirc;tre
            envoy&eacute;e.
          </Text>
          <Text>
            Aucune information personnelle de l&#39;utilisateur du site www.dzone.dev n&#39;est
            publi&eacute;e &agrave; l&#39;insu de l&#39;utilisateur, &eacute;chang&eacute;e,
            transf&eacute;r&eacute;e, c&eacute;d&eacute;e ou vendue sur un support quelconque
            &agrave; des tiers. Seule l&#39;hypoth&egrave;se du rachat du site www.dzone.dev et de
            ses droits autorise Abdelkarim MEHIAOUI &agrave; transmettre les dites informations
            &agrave; l&#39;&eacute;ventuel acqu&eacute;reur qui serait &agrave; son tour
            tenu&nbsp;&agrave; la m&ecirc;me obligation de conservation et de modification des
            donn&eacute;es vis &agrave; vis de l&#39;utilisateur du site www.dzone.dev.
            <br />
            Le site www.dzone.dev est en conformit&eacute; avec le RGPD voir notre politique
            RGPD&nbsp;
            <NavLink to="/rgpd-fr">
              <strong>www.dzone.dev/rgpd.</strong>{' '}
            </NavLink>
          </Text>
          <Text>
            Les bases de donn&eacute;es sont prot&eacute;g&eacute;es par les dispositions de la loi
            du 1er juillet 1998 transposant la directive 96/9 du 11 mars 1996 relative &agrave; la
            protection juridique des bases de donn&eacute;es.
          </Text>
        </Text>
      </Text>
    </Center>
  );
}
