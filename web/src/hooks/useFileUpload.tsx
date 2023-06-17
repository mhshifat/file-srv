import { useCallback, useRef } from "react";
import { extractFunctionsFormObj, slugifyString } from "../utils";

interface FileUploadError {
	type: "validation";
	message: string;
}

export type IUploadProgressResult = {
  fileName: string;
  percentage: string;
  kbps: number
  minutes: number
  seconds: number
};

interface FileUploadHookProps {
	onValidationError?: (reason: FileUploadError) => void;
	onProgress?: (results: IUploadProgressResult) => void;
}

export default function useFileUpload(
	url: string,
	options?: FileUploadHookProps
) {
	const urlRef = useRef(url);
	const functionRefs = useRef<Partial<typeof options>>(
		extractFunctionsFormObj(options || {})
	);
	const validateFiles = useCallback(async (files: FileList) => {
		console.log("Validating", files.length);
		return { isValid: true };
	}, []);
	const handleFileUpload = useCallback(
		async (files: FileList | null) => {
			const startTime = new Date().getTime();
			if (!files || !files.length) return;
			const { isValid } = await validateFiles(files);
			if (!isValid)
				return functionRefs.current?.onValidationError?.({
					type: "validation",
					message: "Invalid file(s)",
				});
			for await (const file of files) {
				const fileReader = new FileReader();
				fileReader.readAsArrayBuffer(file);
				fileReader.onload = async (e) => {
					const CHUNK_SIZE = 1000 * 5;
					const totalByteLength =
						(e.target?.result as unknown as ArrayBuffer)?.byteLength ?? 0;
					const totalChunk = Math.ceil(totalByteLength / CHUNK_SIZE);
					const fileName =
						slugifyString(
							Math.random() * 1000 +
								"-" +
								Date.now() +
								"-" +
								file.name.split(".")[0]
						) +
						"." +
						file.name.split(".")[1];

					for (let chunkId = 0; chunkId < totalChunk; chunkId++) {
						const chunk = e.target?.result?.slice(
							chunkId * CHUNK_SIZE,
							chunkId * CHUNK_SIZE + CHUNK_SIZE
						);
						await fetch(
							`${urlRef.current}?filename=${fileName}&size=${file.size}&mimetype=${file.type}&original_name=${file.name}`.concat(
								chunkId + 1 === totalChunk ? "&complete=true" : ""
							),
							{
								method: "POST",
								body: chunk,
								headers: {
									"Content-Type": "application/octet-stream",
									"Content-Length": String((chunk as string)?.length ?? 0),
								},
							}
						);
						const completedPercentage = Math.round(
							((chunkId + 1) / totalChunk) * 100
						);
						const duration = (new Date().getTime() - startTime) / 1000;
						const bps = e.loaded / duration;
						const kbps = Math.floor(bps / 1024);
						const time = (file.size - chunkId * CHUNK_SIZE + CHUNK_SIZE) / bps;
						const seconds = Math.round(time % 60);
						const minutes = Math.round(time / 60);
						functionRefs.current?.onProgress?.({
							fileName,
							percentage: String(completedPercentage),
							kbps: completedPercentage === 100 ? 0 : kbps,
							minutes: completedPercentage === 100 ? 0 : minutes,
							seconds: completedPercentage === 100 ? 0 : seconds,
						});
					}
				};
			}
		},
		[validateFiles]
	);

	return { handleFileUpload };
}
