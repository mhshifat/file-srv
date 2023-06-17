import { Label } from "..";
import { useFileUpload } from "../../../hooks";
import { IUploadProgressResult } from "../../../hooks/useFileUpload";
import { ProgressBar } from "../../ui";
import classes from "./FileUploadBlock.module.scss";
import { useEffect, useMemo, useState } from "react";

interface FileUploadBlockProps {
  onSuccess: (results: IUploadProgressResult[]) => void;
}

export default function FileUploadBlock({ onSuccess }: FileUploadBlockProps) {
  const [showSuccess, setShowSuccess] = useState(false)
	const [fileUploadProgress, setFileUploadProgress] = useState<
		IUploadProgressResult[]
	>([]);
	const { handleFileUpload } = useFileUpload(
		"http://localhost:8000/api/v1/files/upload",
		{
			onProgress: (progress) => {
				setFileUploadProgress((values) => {
					const newValues = [...values];
					const existing = newValues.findIndex(
						(i) => i.fileName === progress.fileName
					);
					if (existing === -1) newValues.push(progress);
					else newValues.splice(existing, 1, progress);
					return newValues;
				});
			},
		}
	);

  const isFileUploadsComplete = useMemo(() => {
    const isSuccess = !!fileUploadProgress.length && fileUploadProgress.every(i => i.percentage === '100');
    isSuccess && setTimeout(() => {
      onSuccess?.(fileUploadProgress);
    }, 5000);
    return isSuccess;
  }, [fileUploadProgress, onSuccess])

  useEffect(() => {
    let timer: number | undefined = undefined;
    if (isFileUploadsComplete) timer = setTimeout(() => {
      setShowSuccess(true);
    }, 3000);
    else setShowSuccess(false);

    return () => {
      clearTimeout(timer);
    }
  }, [isFileUploadsComplete])

	return (
		<div className={classes.FileUploadBlock}>
			{!showSuccess && <div className={classes.FileUploadBlock__Header}>
				<h3>Upload Files</h3>
				<p>
					Upload documents you want to share
					<br /> with your account
				</p>
			</div>}

			{!fileUploadProgress.length && (
				<div className={classes.FileUploadBlock__Area}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						shapeRendering="geometricPrecision"
						textRendering="geometricPrecision"
						imageRendering="optimizeQuality"
						fillRule="evenodd"
						clipRule="evenodd"
						viewBox="0 0 441 512.02"
						width="5.5rem"
					>
						<path d="M324.87 279.77c32.01 0 61.01 13.01 82.03 34.02 21.09 21 34.1 50.05 34.1 82.1 0 32.06-13.01 61.11-34.02 82.11l-1.32 1.22c-20.92 20.29-49.41 32.8-80.79 32.8-32.06 0-61.1-13.01-82.1-34.02-21.01-21-34.02-50.05-34.02-82.11s13.01-61.1 34.02-82.1c21-21.01 50.04-34.02 82.1-34.02zM243.11 38.08v54.18c.99 12.93 5.5 23.09 13.42 29.85 8.2 7.01 20.46 10.94 36.69 11.23l37.92-.04-88.03-95.22zm91.21 120.49-41.3-.04c-22.49-.35-40.21-6.4-52.9-17.24-13.23-11.31-20.68-27.35-22.19-47.23l-.11-1.74V25.29H62.87c-10.34 0-19.75 4.23-26.55 11.03-6.8 6.8-11.03 16.21-11.03 26.55v336.49c0 10.3 4.25 19.71 11.06 26.52 6.8 6.8 16.22 11.05 26.52 11.05h119.41c2.54 8.79 5.87 17.25 9.92 25.29H62.87c-17.28 0-33.02-7.08-44.41-18.46C7.08 432.37 0 416.64 0 399.36V62.87c0-17.26 7.08-32.98 18.45-44.36C29.89 7.08 45.61 0 62.87 0h173.88c4.11 0 7.76 1.96 10.07 5l109.39 118.34c2.24 2.43 3.34 5.49 3.34 8.55l.03 119.72c-8.18-1.97-16.62-3.25-25.26-3.79v-89.25zm-229.76 54.49c-6.98 0-12.64-5.66-12.64-12.64 0-6.99 5.66-12.65 12.64-12.65h150.49c6.98 0 12.65 5.66 12.65 12.65 0 6.98-5.67 12.64-12.65 12.64H104.56zm0 72.3c-6.98 0-12.64-5.66-12.64-12.65 0-6.98 5.66-12.64 12.64-12.64h142.52c3.71 0 7.05 1.6 9.37 4.15a149.03 149.03 0 0 0-30.54 21.14H104.56zm0 72.3c-6.98 0-12.64-5.66-12.64-12.65 0-6.98 5.66-12.64 12.64-12.64h86.2c-3.82 8.05-6.95 16.51-9.29 25.29h-76.91zm264.81 47.03c3.56-.14 6.09-1.33 7.54-3.55 3.98-5.94-1.44-11.81-5.19-15.94l-40.04-40.71c-4.32-4.26-9.32-4.31-13.64 0l-41.01 41.82c-3.51 3.96-7.86 9.36-4.19 14.83 1.49 2.22 4 3.41 7.56 3.55h19.74v30.69c0 5.84 4.81 10.69 10.7 10.69h28.06c5.9 0 10.71-4.81 10.71-10.69v-30.69h19.76z" />
					</svg>
					<h3>
						Drag & drop <span>Any</span> files
					</h3>
					<small>
						or{" "}
						<label>
							<input
								type="file"
								hidden
								multiple
								onChange={(e) => handleFileUpload(e.target.files)}
							/>
							<span>browse files</span>
						</label>{" "}
						on your computer
					</small>
				</div>
			)}

			{!showSuccess && !!fileUploadProgress.length && (
				<div className={classes.FileUploadBlock__UploadedFiles}>
					<Label as="h3">Uploaded Files</Label>

					{fileUploadProgress.map((item) => (
						<div
							key={item.fileName}
							className={classes.FileUploadBlock__UploadedFile}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								shapeRendering="geometricPrecision"
								textRendering="geometricPrecision"
								imageRendering="optimizeQuality"
								fillRule="evenodd"
								clipRule="evenodd"
								viewBox="0 0 441 512.02"
								width="2.5rem"
							>
								<path d="M324.87 279.77c32.01 0 61.01 13.01 82.03 34.02 21.09 21 34.1 50.05 34.1 82.1 0 32.06-13.01 61.11-34.02 82.11l-1.32 1.22c-20.92 20.29-49.41 32.8-80.79 32.8-32.06 0-61.1-13.01-82.1-34.02-21.01-21-34.02-50.05-34.02-82.11s13.01-61.1 34.02-82.1c21-21.01 50.04-34.02 82.1-34.02zM243.11 38.08v54.18c.99 12.93 5.5 23.09 13.42 29.85 8.2 7.01 20.46 10.94 36.69 11.23l37.92-.04-88.03-95.22zm91.21 120.49-41.3-.04c-22.49-.35-40.21-6.4-52.9-17.24-13.23-11.31-20.68-27.35-22.19-47.23l-.11-1.74V25.29H62.87c-10.34 0-19.75 4.23-26.55 11.03-6.8 6.8-11.03 16.21-11.03 26.55v336.49c0 10.3 4.25 19.71 11.06 26.52 6.8 6.8 16.22 11.05 26.52 11.05h119.41c2.54 8.79 5.87 17.25 9.92 25.29H62.87c-17.28 0-33.02-7.08-44.41-18.46C7.08 432.37 0 416.64 0 399.36V62.87c0-17.26 7.08-32.98 18.45-44.36C29.89 7.08 45.61 0 62.87 0h173.88c4.11 0 7.76 1.96 10.07 5l109.39 118.34c2.24 2.43 3.34 5.49 3.34 8.55l.03 119.72c-8.18-1.97-16.62-3.25-25.26-3.79v-89.25zm-229.76 54.49c-6.98 0-12.64-5.66-12.64-12.64 0-6.99 5.66-12.65 12.64-12.65h150.49c6.98 0 12.65 5.66 12.65 12.65 0 6.98-5.67 12.64-12.65 12.64H104.56zm0 72.3c-6.98 0-12.64-5.66-12.64-12.65 0-6.98 5.66-12.64 12.64-12.64h142.52c3.71 0 7.05 1.6 9.37 4.15a149.03 149.03 0 0 0-30.54 21.14H104.56zm0 72.3c-6.98 0-12.64-5.66-12.64-12.65 0-6.98 5.66-12.64 12.64-12.64h86.2c-3.82 8.05-6.95 16.51-9.29 25.29h-76.91zm264.81 47.03c3.56-.14 6.09-1.33 7.54-3.55 3.98-5.94-1.44-11.81-5.19-15.94l-40.04-40.71c-4.32-4.26-9.32-4.31-13.64 0l-41.01 41.82c-3.51 3.96-7.86 9.36-4.19 14.83 1.49 2.22 4 3.41 7.56 3.55h19.74v30.69c0 5.84 4.81 10.69 10.7 10.69h28.06c5.9 0 10.71-4.81 10.71-10.69v-30.69h19.76z" />
							</svg>

							<div className={classes.FileUploadBlock__UploadedFileInfo}>
								<h3>
									<button title={item.fileName}>{item.fileName}</button>
									<div>
										<span>{item.percentage}%</span> -&nbsp;
										<span>{item.kbps} kb/s</span> -&nbsp;
										<span>
											{String(item.minutes).padStart(2, "0")}:
											{String(item.seconds).padStart(2, "0")}
										</span>
									</div>
								</h3>
								<ProgressBar percentage={+item.percentage} />
							</div>
						</div>
					))}
				</div>
			)}

			{showSuccess && <div className={classes.FileUploadBlock__SuccessMsg}>
				<svg
					className="svg-icon"
					style={{
						width: "1em",
						height: "1em",
						verticalAlign: "middle",
						fill: "currentColor",
						overflow: "hidden",
					}}
					viewBox="0 0 1024 1024"
					version="1.1"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M287.2 372.6m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
						fill=''
					/>
					<path
						d="M736.8 372.6m-32 0a32 32 0 1 0 64 0 32 32 0 1 0-64 0Z"
						fill=''
					/>
					<path
						d="M513 800.7c-68.4 0-132.7-26.6-181-75-48.4-48.4-75-112.6-75-181 0-17.7 14.3-32 32-32s32 14.3 32 32c0 105.9 86.1 192 192 192s192-86.1 192-192c0-17.7 14.3-32 32-32s32 14.3 32 32c0 68.4-26.6 132.7-75 181-48.3 48.4-112.6 75-181 75z"
						fill=''
					/>
					<path
						d="M512 1024c-69.1 0-136.2-13.5-199.3-40.2C251.7 958 197 921 150 874c-47-47-84-101.7-109.8-162.7C13.5 648.2 0 581.1 0 512s13.5-136.2 40.2-199.3C66 251.7 103 197 150 150c47-47 101.7-84 162.7-109.8C375.8 13.5 442.9 0 512 0c151.1 0 293.7 66.3 391.3 181.8 11.4 13.5 9.7 33.7-3.8 45.1-13.5 11.4-33.7 9.7-45.1-3.8C769 122 644.2 64 512 64 265 64 64 265 64 512s201 448 448 448 448-201 448-448c0-28.9-2.8-57.8-8.2-85.9-3.4-17.3 8-34.1 25.3-37.5 17.3-3.4 34.1 8 37.5 25.3 6.2 32.1 9.4 65.1 9.4 98.1 0 69.1-13.5 136.2-40.2 199.3C958 772.3 921 827 874 874c-47 47-101.8 83.9-162.7 109.7-63.1 26.8-130.2 40.3-199.3 40.3z"
						fill=""
					/>
				</svg>

        <h3>Successfull</h3>
        <p>Your files has been uploaded</p>
			</div>}
		</div>
	);
}
