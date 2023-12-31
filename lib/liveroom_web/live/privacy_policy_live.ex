defmodule LiveroomWeb.PrivacyPolicyLive do
  use LiveroomWeb, :live_view

  @impl true
  def render(assigns) do
    ~H"""
    <div class="py-16 text-3xl font-bold text-accent flex items-center gap-1">
      <img
        src={LiveroomWeb.Endpoint.static_url() <> ~p"/images/liveroom_logo.png"}
        class="w-10 h-10 pt-1"
      /> Liveroom
    </div>

    <h1 class="m-auto pt-16 pb-4 text-5xl"><strong>Privacy Policy</strong></h1>

    <p class="mb-24"><em>Last updated: August 17, 2023</em></p>

    <div class={[
      "max-w-[90ch] px-16",
      "[&_h2]:mt-8 [&_h2]:mb-4 [&_h2]:text-4xl",
      "[&_h3]:mt-6 [&_h3]:mb-4 [&_h3]:text-3xl",
      "[&_h5]:mt-4 [&_h5]:mb-2 [&_h5]:text-xl",
      "[&_p]:mb-3 [&_p]:text-xl [&_p]:leading-8",
      "[&_a]:underline [&_a]:underline-offset-4"
    ]}>
      <h2><strong>Introduction</strong></h2>
      <p>
        Welcome to <strong>Liveroom.</strong>
        Liveroom (“<strong>us</strong>”, “<strong>we</strong>”, or “<strong>our</strong>”) operates
        <a href="https://liveroom.app">https://liveroom.app</a>
        (hereinafter referred to as “<strong>Service</strong>”). Our Privacy Policy governs your visit to <a href="https://liveroom.app">https://liveroom.app</a>, and explains how we collect, safeguard and disclose information that results from your use of our Service. We use your data to provide and improve Service. By using Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, the terms used in this Privacy Policy have the same meanings as in our Terms and Conditions. Our Terms and Conditions (“<strong>Terms</strong>”) govern all use of our Service and together with the Privacy Policy constitutes your agreement with us (“<strong>agreement</strong>”).
      </p>
      <h2><strong>Definitions</strong></h2>
      <p>
        <strong>SERVICE</strong>
        means the <a href="https://liveroom.app">https://liveroom.app</a>
        website operated by Liveroom.
      </p>
      <p>
        <strong>PERSONAL DATA</strong>
        means data about a living individual who can be identified from those data (or from those and other information either in our possession or likely to come into our possession).
      </p>
      <p>
        <strong>USAGE DATA</strong>
        is data collected automatically either generated by the use of Service or from Service infrastructure itself (for example, the duration of a page visit).
      </p>
      <p>
        <strong>COOKIES</strong> are small files stored on your device (computer or mobile device).
      </p>
      <p>
        <strong>DATA CONTROLLER</strong>
        means a natural or legal person who (either alone or jointly or in common with other persons) determines the purposes for which and the manner in which any personal data are, or are to be, processed. For the purpose of this Privacy Policy, we are a Data Controller of your data.
      </p>
      <p>
        <strong>DATA PROCESSORS (OR SERVICE PROVIDERS)</strong>
        means any natural or legal person who processes the data on behalf of the Data Controller. We may use the services of various Service Providers in order to process your data more effectively.
      </p>
      <p>
        <strong>DATA SUBJECT</strong> is any living individual who is the subject of Personal Data.
      </p>
      <p>
        <strong>THE USER</strong>
        is the individual using our Service. The User corresponds to the Data Subject, who is the subject of Personal Data.
      </p>
      <h2><strong>Information Collection and Use</strong></h2>
      <p>
        We collect several different types of information for various purposes to provide and improve our Service to you.
      </p>
      <h3><strong>Types of Data Collected</strong></h3>
      <h5><strong>Personal Data</strong></h5>
      <p>
        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (“<strong>Personal Data</strong>”). Personally identifiable information may include, but is not limited to:<br />(a) Email address<br />(b) First name and last name<br />(c) Cookies and Usage Data
      </p>
      <p>
        We may use your Personal Data to contact you with newsletters, marketing or promotional materials, and other information that may be of interest to you. You may opt-out of receiving any, or all, of these communications from us by following the unsubscribe link.
      </p>
      <h5><strong>Usage Data</strong></h5>
      <p>
        We may also collect information that your browser sends whenever you visit our Service or when you access Service by or through a mobile device (“<strong>Usage Data</strong>”). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data. When you access Service with a mobile device, this Usage Data may include information such as the type of mobile device you use, your mobile device unique ID, the IP address of your mobile device, your mobile operating system, the type of mobile Internet browser you use, unique device identifiers and other diagnostic data.
      </p>
      <h5><strong>Tracking Cookies Data</strong></h5>
      <p>
        We use cookies and similar tracking technologies to track the activity on our Service and we hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device. Other tracking technologies are also used such as beacons, tags and scripts to collect and track information and to improve and analyze our Service. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
      </p>
      <p>
        Examples of Cookies we use:<br />(a) <strong>Session Cookies</strong>: We use Session Cookies to operate our Service.<br />(b) <strong>Preference Cookies</strong>: We use Preference Cookies to remember your preferences and various settings.<br />(c) <strong>Security Cookies</strong>: We use Security Cookies for security purposes.<br />(d) <strong>Advertising Cookies</strong>: Advertising Cookies are used to serve you with advertisements that may be relevant to you and your interests.<strong> </strong>
      </p>
      <h3><strong>Use of Data</strong></h3>
      <p>
        Liveroom uses the collected data for various purposes: (a) to provide and maintain our Service; (b) to notify you about changes to our Service; (c) to allow you to participate in interactive features of our Service when you choose to do so; (d) to provide customer support; (e) to gather analysis or valuable information so that we can improve our Service; (f) to monitor the usage of our Service; (g) to detect, prevent and address technical issues; (h) to fulfill any other purpose for which you provide it; (i) to carry out our obligations and enforce our rights arising from any contracts entered into between you and us, including for billing and collection; (j) to provide you with notices about your account and/or subscription, including expiration and renewal notices, email-instructions, etc.; (k) to provide you with news, special offers and general information about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless you have opted not to receive such information; (l) in any other way we may describe when you provide the information; (m) for any other purpose with your consent.
      </p>
      <h3><strong>Retention of Data</strong></h3>
      <p>
        We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations (for example, if we are required to retain your data to comply with applicable laws), resolve disputes, and enforce our legal agreements and policies. We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period, except when this data is used to strengthen the security or to improve the functionality of our Service, or we are legally obligated to retain this data for longer time periods.
      </p>
      <h3><strong>Transfer of Data</strong></h3>
      <p>
        Your information, including Personal Data, may be transferred to – and maintained on – computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction. If you are located outside United States and choose to provide information to us, please note that we transfer the data, including Personal Data, to United States and process it there. Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer. Liveroom will take all the steps reasonably necessary to ensure that your data is treated securely and in accordance with this Privacy Policy and no transfer of your Personal Data will take place to an organisation or a country unless there are adequate controls in place including the security of your data and other personal information.
      </p>
      <h3><strong>Disclosure of Data</strong></h3>
      <p>We may disclose personal information that we collect, or you provide:</p>
      <p>
        (a) <strong>Disclosure for Law Enforcement</strong>. Under certain circumstances, we may be required to disclose your Personal Data if required to do so by law or in response to valid requests by public authorities.
      </p>
      <p>
        (b) <strong>Business Transaction</strong>. If we or our subsidiaries are involved in a merger, acquisition or asset sale, your Personal Data may be transferred.
      </p>
      <p>
        (c) <strong>Other cases. We may disclose your information also</strong>: (i) to our subsidiaries and affiliates; (ii) to contractors, service providers, and other third parties we use to support our business; (iii) to fulfill the purpose for which you provide it.
      </p>
      <h3><strong>Security of Data</strong></h3>
      <p>
        The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
      </p>
      <h3>
        <strong>Your Data Protection Rights Under General Data Protection Regulation (GDPR)</strong>
      </h3>
      <p>
        If you are a resident of the European Union (EU) and European Economic Area (EEA), you have certain data protection rights, covered by GDPR.
      </p>
      <p>
        See more at
        <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj">
          https://eur-lex.europa.eu/eli/reg/2016/679/oj
        </a>
      </p>
      <p>
        We aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Data. If you wish to be informed what Personal Data we hold about you and if you want it to be removed from our systems, please email us at <a href="mailto:b.nouvellet+liveroom@gmail.com">b.nouvellet+liveroom@gmail.com</a>.
      </p>
      <p>
        In certain circumstances, you have the following data protection rights:<br />(a) the right to access, update or to delete the information we have on you;<br />(b) the right of rectification. You have the right to have your information rectified if that information is inaccurate or incomplete;<br />(c) the right to object. You have the right to object to our processing of your Personal Data;<br />(d) the right of restriction. You have the right to request that we restrict the processing of your personal information;<br />(e) the right to data portability. You have the right to be provided with a copy of your Personal Data in a structured, machine-readable and commonly used format;<br />(f) the right to withdraw consent. You also have the right to withdraw your consent at any time where we rely on your consent to process your personal information.
      </p>
      <p>
        Please note that we may ask you to verify your identity before responding to such requests. Please note, we may not able to provide Service without some necessary data. You have the right to complain to a Data Protection Authority about our collection and use of your Personal Data. For more information, please contact your local data protection authority in the European Economic Area (EEA).
      </p>
      <h3>
        <strong>
          Your Data Protection Rights under the California Privacy Protection Act (CalOPPA)
        </strong>
      </h3>
      <p>
        CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy. The law's reach stretches well beyond California to require a person or company in the United States (and conceivable the world) that operates websites collecting personally identifiable information from California consumers to post a conspicuous privacy policy on its website stating exactly the information being collected and those individuals with whom it is being shared, and to comply with this policy.
      </p>
      <p>
        See more at:
        <a href="https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/">
          https://consumercal.org/about-cfc/cfc-education-foundation/california-online-privacy-protection-act-caloppa-3/
        </a>
      </p>
      <p>
        According to CalOPPA we agree to the following:<br />(a) users can visit our site anonymously;<br />(b) our Privacy Policy link includes the word “Privacy”, and can easily be found on the page specified above on the home page of our website;<br />(c) users will be notified of any privacy policy changes on our Privacy Policy Page;<br />(d) users are able to change their personal information by emailing us at <a href="mailto:b.nouvellet+liveroom@gmail.com">b.nouvellet+liveroom@gmail.com</a>.
      </p>
      <p>
        Our Policy on “Do Not Track” Signals: We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked. You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.
      </p>

      <%!-- <h2><strong>Service Providers</strong></h2>
      <p>
        We may employ third-party companies and individuals to facilitate our Service (“<strong>Service Providers</strong>”), provide Service on our behalf, perform Service-related services or assist us in analyzing how our Service is used. These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
      </p>
      <ol role="list">
        <li>
          <strong>Analytics</strong>
          We may use third-party Service Providers to monitor and analyze the use of our Service.<br />
          <strong>Google Analytics</strong>
          Google Analytics is a web analytics service offered by Google that tracks and reports website traffic. Google uses the data collected to track and monitor the use of our Service. This data is shared with other Google services. Google may use the collected data to contextualize and personalize the ads of its own advertising network. For more information on the privacy practices of Google, please visit the Google Privacy Terms web page:
          <a href="https://policies.google.com/privacy?hl=en">
            https://policies.google.com/privacy?hl=en
          </a>
          We also encourage you to review Google's policy for safeguarding your data: <a href="https://support.google.com/analytics/answer/6004245">https://support.google.com/analytics/answer/6004245</a>.
        </li>
        <li>
          <strong>CI/CD tools</strong>
          We may use third-party Service Providers to automate the development process of our Service.<br />
          <strong>GitHub</strong>
          GitHub is provided by GitHub, Inc. GitHub is a development platform to host and review code, manage projects, and build software. For more information on what data GitHub collects for what purpose and how the protection of the data is ensured, please visit GitHub Privacy Policy page: <a href="https://help.github.com/en/articles/github-privacy-statement">https://help.github.com/en/articles/github-privacy-statement</a>.
        </li>
        <li>
          <strong>Payments</strong>
          We may provide paid products and/or services within Service. In that case, we use third-party services for payment processing (e.g. payment processors). We will not store or collect your payment card details. That information is provided directly to our third-party payment processors whose use of your personal information is governed by their Privacy Policy. These payment processors adhere to the standards set by PCI-DSS as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, Mastercard, American Express and Discover. PCI-DSS requirements help ensure the secure handling of payment information. The payment processors we work with are:<br />
          <strong>Stripe:</strong>
          Their Privacy Policy can be viewed at <a href="https://stripe.com/us/privacy">https://stripe.com/us/privacy</a>.
        </li>
      </ol> --%>

      <h2><strong>Links to Other Sites</strong></h2>
      <p>
        Our Service may contain links to other sites that are not operated by us. If you click a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit. We have no control over and assume no responsibility for the content, privacy policies or practices of any third party sites or services.
      </p>
      <h2><strong>Children's Privacy</strong></h2>
      <p>
        Our Service does not address anyone under the age of 18 (“<strong>Children</strong>”). We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.
      </p>
      <h2><strong>Changes to This Privacy Policy</strong></h2>
      <p>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. We will let you know via email and/or a prominent notice on our Service, prior to the change becoming effective and update “effective date” at the top of this Privacy Policy. You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
      </p>
      <h2><strong>Contact Us</strong></h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us: <a href="mailto:b.nouvellet+liveroom@gmail.com">b.nouvellet+liveroom@gmail.com</a>.
      </p>
      <p><br /></p>
    </div>

    <.footer />
    """
  end

  ### Components

  def section(assigns) do
    ~H"""
    <section class={["flex flex-col items-center gap-10 py-24 md:gap-14 xl:py-32 px-8", @class]}>
      <%= render_slot(@inner_block) %>
    </section>
    """
  end

  def footer(assigns) do
    ~H"""
    <footer class="p-8 grid place-items-center bg-background">
      <small class="text-sm text-gray-400">
        Follow
        <a tabindex="-1" class="font-bold" href="https://twitter.com/Liveroom_app">
          @liveroom
        </a>
        for invites
      </small>
    </footer>
    """
  end

  ### Server

  @impl true
  def mount(_params, _session, socket) do
    {:ok, assign(socket, page_title: "Privacy Policy")}
  end
end
