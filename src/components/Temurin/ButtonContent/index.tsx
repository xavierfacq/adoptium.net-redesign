import React from "react"
import { Link } from "gatsby-plugin-react-i18next"
import { BsDownload } from "react-icons/bs"
import { RxCrossCircled } from "react-icons/rx"
import { FaApple, FaWindows } from "react-icons/fa"

interface CardData {
  icon: React.ReactNode
  title: string
  description: string
  link: string
  os: string
  arch: string
  pkg_type: string
  checksum: string
  java_version: string
}

const ButtonContent = ({ results }) => {
  const navigationItem = [
    {
      title: "Release notes",
    },
    {
      title: "Installation guide",
    },
    {
      title: "Supported Configurations",
    },
    {
      title: "Terms of use",
    },
  ]
  const CardData: CardData[] = []
  // loop through results and find macOS and Windows installers
  results &&
    results.map(result => {
      if (result.os === "mac" && result.architecture === "aarch64") {
        CardData.push({
          icon: <FaApple size={30} />,
          title: "macOS",
          os: result.os,
          arch: result.architecture,
          checksum: result.binaries[0].installer_checksum,
          java_version: result.release_name,
          pkg_type: result.binaries[0].type,
          description: `Temurin ${result.release_name}, macOS aarch64 (M1) (${result.binaries[0].installer_extension.toUpperCase()})`,
          link: result.binaries[0].installer_link,
        })
      }
      if (result.os === "windows" && result.architecture === "x64") {
        CardData.push({
          icon: <FaWindows size={30} />,
          title: "Windows",
          os: result.os,
          arch: result.architecture,
          checksum: result.binaries[0].installer_checksum,
          java_version: result.release_name,
          pkg_type: result.binaries[0].type,
          description: `Temurin ${result.release_name}, Windows 64 bit (${result.binaries[0].installer_extension.toUpperCase()})`,
          link: result.binaries[0].installer_link,
        })
      }
    })

  return (
    <>
      <div className=" w-full max-w-[1264px] mx-auto">
        <ul className="flex md:flex-row flex-col gap-4 lg:gap-8 items-start  w-full  justify-start sm:justify-center sm:items-center  my-8 lg:my-16">
          {navigationItem.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 group items-center text-white hover:text-primary transition-all duration-300 ease-in-out text-xl font-normal cursor-pointer"
            >
              <span className=" group  ">
                <RxCrossCircled />
              </span>{" "}
              {item.title}
            </li>
          ))}
        </ul>

        <div className="flex justify-between flex-col md:flex-row  w-full items-center  gap-8">
          {CardData.map((card, index) => (
            <div
              key={index}
              className="p-8 bg-[#200E46]  justify-between w-full border rounded-[24px] border-[#564873] h-[264px] flex flex-col   transition-all duration-300 ease-in-out hover:border-primary shadow-[0_2px_4px_rgba(255,20,100,0.2)]"
            >
              <span className="p-6 rounded-full w-fit bg-[#2B1A4F] border border-[#5A4D76]">
                {card.icon}
              </span>
              <div className="flex justify-between items-center gap-8">
                <div className="flex flex-col  space-y-2">
                  <h4 className="text-4xl font-semibold">{card.title}</h4>
                  <h5 className="text-base font-normal text-grey">
                    {card.description}
                  </h5>
                </div>
                <span className="p-3 group cursor-pointer rounded-full w-fit bg-[#2B1A4F] border border-[#5A4D76] hover:border-primary transition-all duration-300 ease-in-out">
                  <Link
                    to="/download"
                    state={{
                      link: card.link,
                      checksum: card.checksum,
                      os: card.os,
                      arch: card.arch,
                      pkg_type: card.pkg_type,
                      java_version: card.java_version,
                    }}
                    placeholder={"Download"}
                  >
                    <BsDownload size={25} />
                  </Link>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ButtonContent
