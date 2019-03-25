import { Model } from 'mongoose';
import { Injectable, Req, Res } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as jwt from 'jsonwebtoken'
import passport from 'passport'
import User from './interfaces/user.interface'
import Employer from './interfaces/employer.interface'
import Applicant from './interfaces/applicant.interface'

import Signup from './dto/signup.dto'
import Login from './dto/login.dto'

@Injectable()
export class AppService {

  secret: String = '123123123'

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Employer') private readonly employerModel: Model<Employer>,
    @InjectModel('Applicant') private readonly applicantModel: Model<Applicant>
  ) { }

  async login(payload: Login): Promise<any> {

    const user = await this.userModel.findOne({ username: { $eq: payload.username } }).exec()

    if (!user) {
      return { message: 'unauthorized' }
    }

    const valid = await user.verifyPassword(payload.password)
    console.log('valid', valid)

    if (valid) {
      let userData = user
      const userObject = {
        username: userData.username,
        uid: userData._id,
        type: userData.type,
        roles: [userData.type],
      }
      // generate a signed json web token with the contents of user object and return it in the response
      const token = jwt.sign(userObject, this.secret)
      return { userObject, token }
    } else {
      return { message: 'unauthorized' }
    }

  }

  async signup(payload: Signup): Promise<any> {
    const scope = this

    const userExists = await this.userModel.findOne({
      $and: [{ $or: [{ username: payload.username }] }, { $or: [{ email: payload.email }] }],
    }).exec()

    if (!userExists) {
      //create user for auth purposes
      const createdUser = scope.userModel(payload);
      const user = await createdUser.save()

      if (!user) return console.error(user)

      if (user.type === 'employer') {
        var newEmployer = scope.employerModel({ uid: user._id })
        const employer = newEmployer.save()
        if (!employer) return console.error(employer)
      } else {
        var newApplicant = scope.applicantModel({ uid: user._id })
        const applicant = newApplicant.save()
        if (!applicant) return console.error(applicant)
      }

      return 'signed up'

    } else {
      return 'user exists'
    }
  }

  async checkToken(payload: any): Promise<any> {
    if (!payload.token) {
      return false
    }
    try {
      const decoded = await jwt.verify(payload.token, this.secret);
      const user = await this.userModel.findOne({ _id: decoded.uid, username: decoded.username })
      if (user) {
        let userData = user
        let data = {
          authenticated: true,
          user: {
            username: userData.username,
            uid: userData._id,
            type: userData.type,
            roles: [userData.type],
          },
        }
        return data
      } else {
        return { authenticated: false, user: null }
      }
    } catch (e) {
      return false
    }
  }

}
