import firebase from "gatsby-plugin-firebase";
import {Experiment, PotassiumArgonAgeCalculationService} from "./PotassiumArgonAgeCalculationService";


export class PotassiumArgonAgeCalculationCloudFunctionService extends PotassiumArgonAgeCalculationService {
    call(experiments: Experiment[]) {
        const functions = firebase.app().functions('us-west4');
        const calculateAgeByPotassiumArgon = functions.httpsCallable('calculate_age_by_potassium_argon');
        return calculateAgeByPotassiumArgon(experiments);
    }
}