import { IMapper } from "../../../../typings";
import { getObjectProperties } from "../../../../utils";
import { DataNotFound, Label } from "../../../partials";
import { Box, Button, Input, Select, Textarea } from "../../../ui";
import { MapperList } from "../../mappers";
import classes from "./FileMapperBlock.module.scss";
import { useState, useMemo, useCallback, useEffect } from "react";

interface FileMapperBlockProps {
	fileId: string;
}

const createMapper = async (body: {
  fileId: string;
  mapperProperties: { property: string, type: string }[]
  jsonInput: string;
  name: string;
}) => {
  return fetch('http://localhost:8000/api/v1/files/mappers', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then((res) => {
    if (res.ok) return res.json();
    throw res.body;
  })
}

const getMappers = async (query: { fileId: string }, signal: AbortSignal) => {
  const url = new URL('http://localhost:8000/api/v1/files/mappers');
  if (query?.fileId) url.searchParams.set('fileId', query.fileId);
  return fetch(url, {
    signal
  }).then((res) => {
    if (res.ok) return res.json();
    throw res.body;
  })
}

export default function FileMapperBlock({ fileId }: FileMapperBlockProps) {
  const [loading, setLoading] = useState(false);
  const [mappers, setMappers] = useState<IMapper[]>([]);
  const [showCreateMapperBlock, setShowCreateMapperBlock] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [newMapperName, setNewMapperName] = useState('');
	const [jsonInput, setJsonInput] = useState(JSON.stringify({}));
  const [mapperProperties, setMapperProperties] = useState<{ property: string; type: string }[]>([]);
	const jsonInputProperties = useMemo(() => {
    return getObjectProperties(JSON.parse(jsonInput)).reduce((acc, val) => {
      const firstProperty = val.split('[')[0];
      if (val.includes('[') && !(acc as string[]).includes(firstProperty)) (acc as string[]).push(firstProperty);
      else if (!val.includes('[')) (acc as string[]).push(val)
      return acc;
    }, [])
  }, [jsonInput]);

  const handleMapperCreate = useCallback(async () => {
    const validateFields = () => {
      const errors = [];
      if (!newMapperName) errors.push('Mapper needs a name');
      const isValid = mapperProperties.length === jsonInputProperties.length;
      if (!isValid) errors.push("Please select a value for each row in 'Required Fields Map'");
      setErrors(errors);
      return !errors.length;
    }
    const isValid = validateFields();
    if (!isValid) return;
    await createMapper({
      fileId,
      mapperProperties,
      jsonInput: JSON.stringify(JSON.parse(jsonInput)),
      name: newMapperName
    });
  }, [mapperProperties, jsonInputProperties, newMapperName, jsonInput, fileId])

  useEffect(() => {
    setLoading(true);
    const controller = new AbortController();
    getMappers({ fileId }, controller.signal)
      .then(({data}) => {
        setMappers(data);
      })
      .catch(console.error)
      .finally(() => {
        setLoading(false);
      })

    return () => {
      controller.abort();
    }
  }, [fileId])

	return loading ? (
    <div className={classes.FileMapperBlock}>
      <p>Loading...</p>
    </div>
  ) : (
		<div className={classes.FileMapperBlock}>
			{!mappers.length && <div className={classes.FileMapperBlock__NotFoundMsg}>
				<svg
					fill="#000000"
					width="800px"
					height="800px"
					viewBox="0 0 1920 1920"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-9.32 1221.49c-80.024 0-145.128 65.105-145.128 145.129 0 80.024 65.104 145.128 145.128 145.128 80.024 0 145.128-65.104 145.128-145.128 0-80.024-65.104-145.128-145.128-145.128Zm192.785-968.859h-385.57l93.901 851.327h197.768l93.901-851.327Z"
						fillRule="evenodd"
					/>
				</svg>
				<div>
					<h3>File Data Import</h3>
					<p>
						It seems you do not have a <strong>Mapper</strong> for this file,
						please create one.
					</p>
					<Button variant="primary" size="md" onClick={() => setShowCreateMapperBlock(true)}>
						Create
					</Button>
				</div>
			</div>}
      {!!errors.length && <div className={classes.FileMapperBlock__Errors}>
				<svg
					fill="#000000"
					width="800px"
					height="800px"
					viewBox="0 0 1920 1920"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M960 0c530.193 0 960 429.807 960 960s-429.807 960-960 960S0 1490.193 0 960 429.807 0 960 0Zm0 101.053c-474.384 0-858.947 384.563-858.947 858.947S485.616 1818.947 960 1818.947 1818.947 1434.384 1818.947 960 1434.384 101.053 960 101.053Zm-9.32 1221.49c-80.024 0-145.128 65.105-145.128 145.129 0 80.024 65.104 145.128 145.128 145.128 80.024 0 145.128-65.104 145.128-145.128 0-80.024-65.104-145.128-145.128-145.128Zm192.785-968.859h-385.57l93.901 851.327h197.768l93.901-851.327Z"
						fillRule="evenodd"
					/>
				</svg>
				<div>
					<h3>It seems you have some errors to fix</h3>
					<ul>
            {errors.map(error => (
              <li key={error}>{error}</li>
            ))}
          </ul>
				</div>
			</div>}
			{showCreateMapperBlock && <div className={classes.FileMapperBlock__Create}>
				<Label as="h3">Create a new Mapper</Label>

        <div>
					<Label as="label">Name</Label>
					<Input
						value={newMapperName}
						onChange={({ target }) => setNewMapperName(target.value)}
					/>
				</div>

				<div>
					<Label as="label">JSON Input</Label>
					<Textarea
						defaultValue={jsonInput}
						onChange={({ target }) => {
              const errorVal = 'Invalid json input';
              try {
                JSON.parse(target.value);
                setJsonInput(target.value);
                setErrors((values) => values.filter(va => va !== errorVal));
              } catch (err) {
                setErrors(values => values.reduce((acc) => {
                  if (acc.includes(errorVal as never)) return acc;
                  acc.push(errorVal as never);
                  return acc;
                }, [errorVal]))
              }
            }}
					/>
				</div>

        <div>
					<Label as="label">Required Fields Map</Label>
          {!!jsonInputProperties.length && jsonInputProperties.map(field => (
            <Box display="flex" key={field}>
              <Input defaultValue={field} readOnly />
              <Select
                options={[
                  { label: "Required", value: 'required' },
                  { label: "Optional", value: 'optional' },
                ]}
                onChange={(value) => {
                  setMapperProperties(values => {
                    const newValues = [...values];
                    const idx = newValues.findIndex(item => item.property === field);
                    const payload = {
                      property: field,
                      type: value
                    }
                    if (idx === -1) newValues.push(payload);
                    else {
                      newValues.splice(idx, 1, payload)
                    }
                    return newValues;
                  })
                }}
              />
            </Box>
          ))}
          {!jsonInputProperties.length && (
            <DataNotFound
              text={<p>Please add your json input</p>}
            />
          )}
        </div>

        <div>
          <Button variant="secondary" size="lg" fluid onClick={handleMapperCreate}>Save</Button>
        </div>
			</div>}
      {!!mappers.length && !showCreateMapperBlock && <MapperList
        mappers={mappers}
        onCreateNew={() => setShowCreateMapperBlock(true)}
      />}
		</div>
	);
}
