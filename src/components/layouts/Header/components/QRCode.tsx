import { useState } from "react";
import HeadlessTippy from "@tippyjs/react/headless";
import images from "assets/images";

type Props = {}

const QRCode = (props: Props) => {
    const [mobileQR, setMobileQR] = useState(false);

  return (
         <HeadlessTippy
            visible={mobileQR}
            onClickOutside={() => setMobileQR(false)}
            interactive={true}
            render={(attrs) => (
              <div
                className="qr-mobile bg-white shadow-md p-4"
                tabIndex={-1}
                {...attrs}
              >
                <p className="font-semibold text-sm">Download App</p>
                <a href="google.com"></a>
                <a href="https://apps.apple.com/US/app/id1560809160?mt=8">
                  <img src={images.qr} alt="" className="w-36" />
                </a>
                <a href="https://apps.apple.com/US/app/id1560809160?mt=8">
                  <div className="app-store flex justify-center items-center">
                    <img
                      src={images.appStoreIcon}
                      alt=""
                      className="w-4 mr-1"
                    />
                    <span className="text-sm text-gray-400	">Apple Store</span>
                  </div>
                </a>

                <a href="https://apps.apple.com/US/app/id1560809160?mt=8">
                  <div className="ch-play flex  justify-center items-center">
                    <img src={images.chPlayIcon} alt="" className="w-4 mr-1" />
                    <span className="text-sm text-gray-400	">Google Play</span>
                  </div>
                </a>
              </div>
            )}
          >
            <button>
              <img
                src={images.mobile}
                alt="icon mobile"
                className="w-12 h-12"
                onClick={() => setMobileQR(true)}
              />
            </button>
          </HeadlessTippy>
  )
}

export default QRCode