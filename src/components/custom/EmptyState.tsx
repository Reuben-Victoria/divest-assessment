import Image from "next/image";

const EmptyState = () => {
  return (
    <section className="empty-state">
      <div className="empty-state_container">
        <Image
          src={
            "https://res.cloudinary.com/dq9rackyr/image/upload/v1761418888/Email_campaign_Flatline_2_gjy67d.png"
          }
          width={241}
          height={200}
          className="empty-state_img"
          alt="Empty State"
        />

        <div className="empty-state_description">
          <h2 className="heading-m">There is nothing here</h2>
          <p className="body-text-v">
            {" "}
            Create an invoice by clicking the <br />
            <span>New Invoice</span> button and get started
          </p>
        </div>
      </div>
    </section>
  );
};

export default EmptyState;
