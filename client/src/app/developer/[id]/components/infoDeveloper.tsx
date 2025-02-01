"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPlayer from "react-player";

interface Video {
  title_video: string;
  video: string;
}

const InfoDeveloper = ({
  dataDev,
}: {
  dataDev: { id: string | number; name: string; description: string };
}) => {
  const [dataVideo, setDataVideo] = useState<Video[]>([]);
  const [choiceVideo, setChoiceVideo] = useState(0);

  useEffect(() => {
    const fetchVideoDev = async () => {
      try {
        const res = await axios.get<{ data: Video[] }>(
          `${process.env.local}/video/dev/${dataDev.id}`
        );
        setDataVideo(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVideoDev();
  }, [dataDev.id]);

  return (
    <div className="w-3/4 p-4">
      <div>
        <h2 className="text-xl font-bold mb-5">{dataDev.name}</h2>
        <p className="pl-5">{dataDev.description}</p>
      </div>

      <div>
        <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
          {dataVideo.map((video, i) => (
            <li
              className={`me-2 cursor-pointer hover:opacity-50 duration-300 ${
                choiceVideo === i ? "active" : ""
              }`}
              key={i}
              onClick={() => setChoiceVideo(i)}
            >
              <span
                className={`inline-block p-4 ${
                  choiceVideo === i
                    ? "text-black bg-gray-100 rounded-t-lg"
                    : "text-gray-500"
                }`}
              >
                {video.title_video}
              </span>
            </li>
          ))}
        </ul>

        <div>
          {dataVideo.length > 0 && (
            <ReactPlayer
              url={dataVideo[choiceVideo]?.video}
              width="100%"
              height="50vh"
              controls
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default InfoDeveloper;
