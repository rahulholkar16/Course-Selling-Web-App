import express from "express";
import jwt from "jsonwebtoken";
import 'dotenv/config';
import mongoose from "mongoose";
import { authSchema } from "../Validation/AuthValidation.js";
import bcrypt from "bcrypt";
import { UserModel, AdminModel, UploadVideoModel } from "../db.js";
import cookieParser from "cookie-parser";

export { express, jwt, mongoose, authSchema, bcrypt, UserModel, cookieParser, AdminModel, UploadVideoModel }