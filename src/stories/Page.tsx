import React from "react";

import { Header } from "./Header";
import { Modal } from "./Modal";
import { SectionCTA } from "./SectionCTA";
import "./page.css";

type User = {
  name: string;
};

export const Page: React.FC = () => {
  const [user, setUser] = React.useState<User>();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);

  return (
    <article>
      <Header
        user={user}
        onLogin={() => setUser({ name: "Jane Doe" })}
        onLogout={() => setUser(undefined)}
        onCreateAccount={() => setUser({ name: "Jane Doe" })}
      />
      <h2 style={{ padding: 40 }}>I am a title</h2>
      <SectionCTA
        title="Enough to wash your face curate, yet we need to button up our approach incentivization"
        description="Conversational content cta back to the drawing-board, so flesh that out message the initiative. Deploy to production this vendor is incompetent"
        buttonLabel="Show Me"
        onButtonClick={openModal}
        containerStyles={{
          marginBottom: 20,
        }}
        image={{
          alt: "lovely image for you to see",
          src: "https://picsum.photos/id/39/900/600",
        }}
      />
      {isModalOpen ? (
        <Modal
          title={"Modal Title"}
          body={<p>I am a modal body</p>}
          onClose={closeModal}
          onConfirmation={openModal}
          confirmationLabel="Make it so"
        />
      ) : null}
    </article>
  );
};
