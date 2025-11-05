import { useEffect, useRef, useState } from "react";
import { ZegoSuperBoardManager } from "zego-superboard-web";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";
import Tools from "./Tools";

function App() {
  const appID = 1339810981;
  const userID = "vamshi";
  const userName = "Vamshi";
  const roomID = "1234";
  const token = "04AAAAAGkMm8kADLU1FvGHWDndWkshvQCwFs4OwNUHtWPQIZKzF4ZP4qCNkCXOiNbPjs5X1+zTmqTmUpFHbT6TQBmqqztuJtkOfHhMsUXCgf4EyxYnh4b3s1If/8mLm4KxV1Je+hWitEfEIPjprxSQk8QzrUjCC8LXJ5aZoiTDacBJ6p1O7b9KNW+iE/Iz7FGSV9fc7OuFwduWVjULdxtEh8wievvnPLfW3D+Ba3258YgEAhA8h1hmUOkelc+0r6JPznwRYM5C/dMB";

  const server = "wss://webliveroom1339810981-api.coolzcloud.com/ws";

  const zgRef = useRef(null);
  const [currentTool, setCurrentTool] = useState(null);

  const initBoard = async () => {
    const zg = zgRef.current;
    const zegoSuperBoard = ZegoSuperBoardManager.getInstance();

    await zegoSuperBoard.init(zg, {
      parentDomID: "parentDomID",
      appID,
      userID,
      token,
    });

    await zg.loginRoom(roomID, token, { userID, userName });

    setCurrentTool(zegoSuperBoard.getToolType());

    const whiteboardView = await zegoSuperBoard.createWhiteboardView({
      name: "Virtual White Board",
      perPageWidth: 1600,
      perPageHeight: 900,
      pageCount: 1,
    });

    zegoSuperBoard.addView(whiteboardView);
  };

  useEffect(() => {
    zgRef.current = new ZegoExpressEngine(appID, server);
    initBoard();
  }, []);

  return (
    <div className="h-screen w-full flex">
      <div className="w-[120px] bg-black flex justify-center">
        <Tools
          currentTool={currentTool}
          onClick={(tool) => {
            ZegoSuperBoardManager.getInstance().setToolType(tool.type);
            setCurrentTool(tool.type);
          }}
        />
      </div>

      <div id="parentDomID" className="flex-1 bg-white h-full"></div>
    </div>
  );
}

export default App;
