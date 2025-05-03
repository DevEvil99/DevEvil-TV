import React from 'react';
import Navbar from '../NavBar';
const Privacy = () => {
	return (
<div>
<Navbar />

<div style={{
	marginTop: '80px',
  color: 'var(--text)',
  marginLeft:'10px',
  fontWeight: '600',
  textAlign: 'center'

}} className="privacy">
						<p>DevEvil TV (&rsquo;we,&rsquo; &rsquo;us,&rsquo; &rsquo;DevEvil,&rsquo; or &rsquo;our&rsquo;) takes the privacy of our users seriously. This privacy
							policy explains how we collect, use, and disclose information about our users.</p>
						<br />
						<h1>Information We Collect</h1>

						<p>We automatically collect certain information when you use our website. This information may
							include your IP address, browser type, operating system, and other technical information
							about your device.</p>
							<br />
						<h1>Use of Information</h1>

						<p>We use the information we collect to provide, maintain, and improve our website, and to
							protect our rights and the rights of others. We may also use the information we collect to
							personalize your experience on our website.
						</p>
						<br />
						<h1>Disclosure of Information
						</h1>
						<p>We may disclose information about you to third parties as required by law, in response to
							legal process, or to protect our rights or the rights of others. We may also disclose
							information about you to third parties in connection with a merger, acquisition, or other
							transaction involving our business.
						</p>
						<p>We do not sell or rent your personal information to third parties for their marketing
							purposes.
						</p>
						<br />
						<h1>Security
						</h1>
						<p>We take reasonable measures to protect the information we collect from unauthorized access,
							disclosure, alteration, or destruction.
						</p>
						<br />
						<h1>Cookies
						</h1>
						<p>We use cookies on our website. A cookie is a small text file that is stored on your device.
							We use cookies to personalize your experience on our website, to remember your preferences,
							and to analyze how our website is used.
						</p>
						<p>You can control the use of cookies on our website by adjusting your browser settings.
							However, if you disable cookies, some features of our website may not work properly.
						</p>
						<br />
						<h1>Changes to this Privacy Policy
						</h1>
						<p>We may change this privacy policy from time to time. If we make significant changes to this
							privacy policy, we will notify you by posting a notice on our website.
						</p>
					</div>
</div>
	);
  };

export default Privacy;
