import { useState } from "react";

const LeiaMais = ({ text }) => {
  const [expandido, setExpandido] = useState(false);

  const limite = 100;

  const textoCurto =
    text.length > limite ? text.slice(0, limite) + "..." : text;

  return (
    <div>
      <p className="text-sm text-muted-foreground leading-relaxed text-justify whitespace-pre-line">
        {expandido ? text : textoCurto}
      </p>

      {text.length > limite && (
        <button
          onClick={() => setExpandido(!expandido)}
          className="text-primary text-sm font-medium mt-2 hover:underline transition-colors"
        >
          {expandido ? "Leia menos" : "Leia mais"}
        </button>
      )}
    </div>
  );
};

export default LeiaMais;