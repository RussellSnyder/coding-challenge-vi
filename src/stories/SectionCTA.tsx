import { useState } from "react";
import { Button } from "./Button";
import "./section-cta.css";

interface Props {
  title: string;
  description: string;
  buttonLabel: string;
  onButtonClick: () => void;
  image: {
    alt: string;
    src: string;
  };
  containerStyles?: React.CSSProperties;
}

export const SectionCTA = ({
  title,
  description,
  buttonLabel,
  onButtonClick,
  image,
  containerStyles,
}: Props) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <section
      style={{ backgroundImage: `url(${image.src})`, ...containerStyles }}
    >
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <Button
            onClick={onButtonClick}
            size="small"
            primary
            label={buttonLabel}
          />
        </div>
      </div>
      <div>
        <img
          onLoad={() => setIsImageLoaded(true)}
          style={{ opacity: isImageLoaded ? 1 : 0 }}
          src={image.src}
          alt={image.alt}
        />
      </div>
    </section>
  );
};
