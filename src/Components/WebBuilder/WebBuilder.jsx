/* eslint-disable react-hooks/exhaustive-deps */
import "grapesjs/dist/css/grapes.min.css";
import grapesjs from "grapesjs";
import { useEffect } from "react";
import grapesJsConfig from "../../../grapesjs-config";

const WebBuilder = () => {
  //load grapesjs components

  const loadGrapesjs = async () => {
    try {
      const editor = await grapesjs.init(grapesJsConfig());
      loadGrapesjsComponents(editor);
    } catch (err) {
      console.log(err);
    }
  };

  const loadGrapesjsComponents = (editor) => {
    const blockManager = editor.BlockManager;
    blockManager.add("my-block-id", {
      label: "My Block",
      content: "<div>My Block</div>",
    });
    editor.Panels.addPanel({
      id: "panel-top",
      el: ".panel__top",
    });
    editor.Panels.addPanel({
      id: "basic-actions",
      el: ".panel__basic-actions",
      buttons: [
        {
          id: "visibility",
          active: true, // active by default
          className: "btn-toggle-borders",
          label: "<u>B</u>",
          command: "sw-visibility", // Built-in command
        },
        {
          id: "export",
          className: "btn-open-export",
          label: "Exp",
          command: "export-template",
          context: "export-template", // For grouping context of buttons from the same panel
        },
        {
          id: "show-json",
          className: "btn-show-json",
          label: "JSON",
          context: "show-json",
          command(editor) {
            editor.Modal.setTitle("Components JSON")
              .setContent(
                `<textarea style="width:100%; height: 250px;">
            ${JSON.stringify(editor.getComponents())}
          </textarea>`
              )
              .open();
          },
        },
      ],
    });
    editor.Commands.add("show-traits", {
      getTraitsEl(editor) {
        const row = editor.getContainer().closest(".editor-row");
        return row.querySelector(".traits-container");
      },
      run(editor) {
        this.getTraitsEl(editor).style.display = "";
      },
      stop(editor) {
        this.getTraitsEl(editor).style.display = "none";
      },
    });
    editor.Commands.add("set-device-desktop", {
      run: (editor) => editor.setDevice("Desktop"),
    });
    editor.Commands.add("set-device-Tablet", {
      run: (editor) => editor.setDevice("Tablet"),
    });
    editor.Commands.add("set-device-mobile", {
      run: (editor) => editor.setDevice("Mobile"),
    });
  };

  useEffect(() => {
    loadGrapesjs();
  }, []);

  return (
    <>
      <div className="panel__top">
        <div className="panel__devices"></div>
        <div className="panel__basic-actions"></div>
        <div className="panel__switcher"></div>
      </div>
      <div className="editor-row">
        <div className="editor-canvas">
          <div id="gjs">
            <h1>Hello Grapesjs</h1>
          </div>
        </div>
        <div className="panel__right">
          <div className="layers-container"></div>
          <div className="styles-container"></div>
          <div className="traits-container"></div>
        </div>
      </div>

      {/* //Add Blocks */}
      <div id="blocks"></div>
    </>
  );
};

export default WebBuilder;
