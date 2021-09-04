import React, { useContext } from "react";
import { ShowEditContext } from "./OpenNote";

export default function Noteitem() {
  const [, setShowEdit] = useContext(ShowEditContext);

  const EditNoteHandle = () => {
    setShowEdit((prev) => !prev);
  };

  return (
    <div onClick={EditNoteHandle} title="Click to edit" className="Noteitem">
      <div>
        <h1>hello</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima
          distinctio consequatur culpa! Autem iusto reiciendis dignissimos
          voluptas! Molestiae, consequatur enim. Lorem ipsum dolor sit, amet
          consectetur adipisicing elit. Atque culpa pariatur vero, magni error
          quia possimus deserunt, minima nemo voluptatum, quos nihil veritatis
          dicta quasi impedit fugit. Vitae, dolor optio. Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Ipsam ea neque voluptatum quas ut
          et quaerat enim, fugit architecto magnam perspiciatis mollitia illo
          odio impedit, ad reprehenderit consectetur, eum doloribus?
        </p>
      </div>
      <h2>Date:040427</h2>
    </div>
  );
}
