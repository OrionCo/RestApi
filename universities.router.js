import {Router} from "express";
import {universityRepository} from "./university.repository.js";

export const universitiesRouter = Router();

universitiesRouter.get('/' , async (req, res) => {
    const universities = (await universityRepository.search().returnAll()).sort((a, b) => b.score - a.score);
    res.send(universities);
})