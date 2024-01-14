import { Schema, Repository } from 'redis-om';
import {createClient} from "redis";

const universitySchema = new Schema('university', {
    "name": {
        "type": "string",
        "required": true
    },
    "type": {
        "type": "string",
        "required": true
    },
    "miasto": {
        "type": "string",
        "required": true
    },
});

const redis = createClient();
redis.on('error', (err) => {
    console.log("Error " + err);
});

await redis.connect();
export const universityRepository = new Repository(universitySchema, redis);

await universityRepository.createIndex();