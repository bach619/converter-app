export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Acceptance of Terms</h2>
        <p className="mb-3">
          By accessing or using our converter tools, you agree to be bound by these Terms of Service.
          If you disagree with any part of these terms, you may not use our services.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Use of Services</h2>
        <p className="mb-3">
          Our converter tools are provided for personal, non-commercial use only. 
          You may not use our services for any illegal or unauthorized purpose.
        </p>
        <p>
          You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of our 
          services without express written permission.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Disclaimer</h2>
        <p className="mb-3">
          Our tools are provided "as is" without warranties of any kind. While we strive for accuracy, 
          we cannot guarantee that conversion results will be error-free.
        </p>
        <p>
          We are not responsible for any decisions made based on the information provided by our tools.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued use of our services 
          constitutes acceptance of any changes.
        </p>
      </section>
    </div>
  );
}
