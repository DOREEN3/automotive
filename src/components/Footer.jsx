import React from 'react';

const Footer = () => {
  return (
    <>
      <div className="container-fluid bg-success">
        <section className="row g-3">
          <div className="col-md-4 text-white text-center">
            <h2>About Us</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Qui, libero.</p>
            <br />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto sed voluptatem laborum illo consequatur quam rem maxime, error dolor at.</p>
          </div>

          <div className="col-md-4 text-white">
            <h2 className="text-center">Contact Us</h2>
            <input type="email" placeholder="Enter your email" className="form-control" />
            <br />
            <textarea placeholder="Leave a message" className="form-control"></textarea>
            <br />
            <button className="btn btn-outline-danger">Send Message</button>
          </div>

          <div className="col-md-4 ">
            <h2 className="text-white text-center">Stay Connected</h2>
            <div className="d-flex justify-content-center">
              <img src="assets/fb.png" alt="facebook" style={{ width: '15%'}} />
              <img src="assets/in.png" alt="instagram" style={{ width: '15%'}} />
              <img src="assets/x.png" alt="x" style={{ width: '15%' }} />
            </div>
            <p className='mt-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem ut doloribus voluptate quod et ratione? Minus ducimus rem corporis delectus.</p>
          </div>
        </section>
      </div>

      <div className="container-fluid bg-dark">
        <p className="mb-0 py-4 text-white text-center">
          Developed by Doreen.&copy; 2025. All rights reserved.
        </p>
      </div>
    </>
  );
}

export default Footer;
