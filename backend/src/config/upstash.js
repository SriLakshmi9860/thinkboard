import {Ratelimit} from  "@upstash/ratelimit";
import{Redis} from "@upstash/redis";
//import rateLimiter from "../middleware/rateLimiter.js";


import dotenv from "dotenv";
//import rateLimiter from "../middleware/rateLimiter";
dotenv.config();

const rateLimit=new Ratelimit({
    redis:Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(5,"10 s"), 
});

export default rateLimit;