import { Component } from '@angular/core';

@Component({
  selector: 'app-calories',
  templateUrl: './calories.component.html',
  styleUrls: ['./calories.component.css']
})
export class CaloriesComponent {
  height: number|null = null;
  weight: number|null = null;
  age: number|null = null;
  sex: string|null = null;
  bmi: number|null = null;
  bmiCategory: string|null = null;

  calculateBMI(): void {
    if (this.height && this.weight) {
      const heightInMeters = this.height / 100;
      const BMI = this.weight / (heightInMeters * heightInMeters);
      this.bmi = Math.round(BMI);
      this.bmiCategory = this.getBMICategory(this.bmi);
    }
  }

  getBMICategory(bmi: number): string {
    if (bmi < 18.5) {
      return 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return 'Healthy';
    } else if (bmi >= 25.0 && bmi < 29.9) {
      return 'Overweight';
    } else {
      return 'Obese';
    }
  }
}
