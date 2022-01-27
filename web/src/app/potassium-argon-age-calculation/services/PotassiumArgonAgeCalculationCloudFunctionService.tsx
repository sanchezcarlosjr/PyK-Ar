import firebase from "gatsby-plugin-firebase";
import {PotassiumArgonAgeCalculationService, PotassiumArgonAgeParameter} from "./PotassiumArgonAgeCalculationService";


export class PotassiumArgonAgeCalculationCloudFunctionService extends PotassiumArgonAgeCalculationService {
    call(experiments: PotassiumArgonAgeParameter) {
        const functions = firebase.app().functions('us-west4');
        const calculateAgeByPotassiumArgon = functions.httpsCallable('calculate_age_by_potassium_argon');
        return calculateAgeByPotassiumArgon(experiments);
    }
}