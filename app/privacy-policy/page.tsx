export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Information Collection</h2>
        <p>
          We do not collect any personal information when you use our converter tools. 
          All conversion calculations happen locally in your browser. No data is sent to 
          external servers or third parties.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Cookies</h2>
        <p>
          We do not use any cookies or tracking technologies on our site.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
        <p>
          If you have any questions about this privacy policy, please contact us 
          at privacy@example.com.
        </p>
      </section>
    </div>
  );
}
