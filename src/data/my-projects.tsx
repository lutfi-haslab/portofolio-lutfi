type Project = {
    work_title: string;
    type: string;
    img_url: string;
    tags: string[];
    detail: string;
    url?: string;
}
export const myProjects: Project[] = [
    {
      work_title: "HasCode UI - Create UI with AI",
      type: "Web Development",
      img_url:"https://res.cloudinary.com/haslab/image/upload/v1715160549/portofolio/npqsdp7clleogzdal4dl.png",
      tags: ["typescript", "nextjs", "ai", "no-code"],
      detail:
        "Web application to create stunning website with AI based on model GPT and Anthropic (Claude) API",
    },
    {
      work_title: "PRIfA CBDC Web suite",
      type: "Web Development",
      img_url:
        "https://res.cloudinary.com/haslab/image/upload/v1713498128/portofolio/web-peruri-cbdc_jjinau.png",
      tags: ["typescript", "blockchain"],
      detail:
        "Web application build with react as frontend and nestjs as backend for prototype Central Bank digital currency, there is 5 website including, Central Bank Suite, Core System Suite, Financial Service Provider, Merchant Suite, and Enterprise Suite",
    },
    {
      work_title: "PRIfA CBDC Mobile App",
      type: "Mobile Development",
      img_url:
        "https://res.cloudinary.com/haslab/image/upload/v1713498127/portofolio/mobile-peruri-cbdc_e4o54u.png",
      tags: ["typescript", "blockchain"],
      detail:
        "A mobile app wallet build with flutter for end user to send and receive DIDR money from CBDC and stablecoind.",
    },
    {
      work_title: "pChain, Blockchain as a Service",
      type: "Web Development",
      img_url:
        "https://res.cloudinary.com/haslab/image/upload/v1713498126/portofolio/web-pchain_g4ohl3.png",
      tags: ["Typescript", "NextJS", "ReactJS", "Blockchain", "Fastify"],
      detail:
        "pChain is a SaaS (Software as a Service) build with NextJs, that simplified Blockchain development using various Blockchain network such as Polygon edge, Hyperledger Besu, Avalance, and Ethereum Testnet. pChain is complete package, there is feature for IPFS storage, static storage using s3, wallet management, and smart contract management. User can use our API to implement Solidity API anywhere like Mobile App, Web, Desktop without worrying using ethers or web3 library.",
    },
    {
      work_title: "Peruri Authenticator Manager",
      type: "Web Development",
      img_url:
        "https://res.cloudinary.com/haslab/image/upload/v1713498126/portofolio/web-peruri-authenticato_hmljmu.png",
      tags: ["Typescript", "NextJS", "ReactJS"],
      detail:
        "A website platform build with NextJS that work to upload document to the Blockchain and setting up the document format using pdf.js, the output from this file is PDF document with user generated style pdf and qr code.",
    },
    {
      work_title: "Mobile Peruri Authenticator",
      type: "Mobile Development",
      tags: ["Kotlin", "Image Processing", "React Native", "Blockchain"],
      img_url:
        "https://res.cloudinary.com/haslab/image/upload/v1713498125/portofolio/mobile-peruri-authenticator_jqs8a9.png",
      detail:
        "A Mobile app build with Kotlin that work to verify document using OpenCV QR scanner or file picker with Blockchain.",
    },
    {
      work_title: "eKYC AWS Liveness Rekognition",
      type: "Web Development",
      tags: ["AWS", "ReactJS", "Amplify"],
      img_url:
        "https://res.cloudinary.com/haslab/image/upload/v1713498125/portofolio/web-aws-liveness_zju956.png",
      detail: "Prototype eKYC using AWS Liveness Rekognition",
    },
  ];
  