import React from "react";

const ContactPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
      <div className="flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-1/2 p-2">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.447923123453!2d106.66806331526089!3d10.7887319923184!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175292c4a31e03d%3A0xa6af74a823a8df77!2zTMOqIFbEg24gU8OgeSwgVMOibiBQaMO6IFRodeG7sSwgSOG7kyBMw6ogQ2jDrSBWaeG7h3QsIEjhu5MgQ2jDrSBNaW5o!5e0!3m2!1sen!2s!4v1626174671283!5m2!1sen!2s"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <p className="mb-4 text-start">
            If you have any questions, please feel free to contact me using the
            form. Our service team will get back to you as soon as possible.
          </p>
          <ul className="mb-4 text-start">
            <li>
              <strong>Address:</strong> Etown 1, Level 3,, 364 Cong Hoa Street,
              Tan Binh District,, Ho Chi Minh City, Thành phố Hồ Chí Minh 736839
            </li>
            <li>
              <strong>Opening hours:</strong>
            </li>
            <li>Mon-Fri: 11.00 - 20.00</li>
            <li>Sat: 10.00 - 20.00</li>
            <li>Sun: 19.00 - 20.00</li>
            <li>
              <strong>Email:</strong> support@hshopp.com
            </li>
            <li>
              <strong>Phone:</strong> (+123) 345 678 xxx
            </li>
          </ul>
          <form className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-2 border rounded"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 border rounded"
            />
            <textarea
              name="message"
              placeholder="Message"
              className="w-full p-2 border rounded"
              rows={4}
            ></textarea>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              SEND
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
