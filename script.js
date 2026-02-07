 function calculateAge() {
            // Get input values
            const day = parseInt(document.getElementById('day').value);
            const month = parseInt(document.getElementById('month').value);
            const year = parseInt(document.getElementById('year').value);
            
            const errorElement = document.getElementById('error');
            const resultElement = document.getElementById('result');
            
            // Hide previous results and errors
            errorElement.classList.remove('show');
            resultElement.classList.remove('show');
            
            // Validate inputs
            if (!day || !month || !year) {
                showError('Please enter a complete date of birth');
                return;
            }
            
            if (day < 1 || day > 31) {
                showError('Please enter a valid day (1-31)');
                return;
            }
            
            if (month < 1 || month > 12) {
                showError('Please enter a valid month (1-12)');
                return;
            }
            
            if (year < 1900 || year > new Date().getFullYear()) {
                showError('Please enter a valid year');
                return;
            }
            
            // Create date object (month is 0-indexed in JavaScript)
            const birthDate = new Date(year, month - 1, day);
            
            // Validate if the date is valid
            if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1 || birthDate.getFullYear() !== year) {
                showError('Invalid date. Please check your input.');
                return;
            }
            
            // Check if date is in the future
            const today = new Date();
            if (birthDate > today) {
                showError('Birth date cannot be in the future');
                return;
            }
            
            // Calculate age
            let ageYears = today.getFullYear() - birthDate.getFullYear();
            let ageMonths = today.getMonth() - birthDate.getMonth();
            let ageDays = today.getDate() - birthDate.getDate();
            
            // Adjust for negative days
            if (ageDays < 0) {
                ageMonths--;
                // Get days in previous month
                const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
                ageDays += prevMonth.getDate();
            }
            
            // Adjust for negative months
            if (ageMonths < 0) {
                ageYears--;
                ageMonths += 12;
            }
            
            // Display results
            document.getElementById('years').textContent = ageYears;
            document.getElementById('months').textContent = ageMonths;
            document.getElementById('days').textContent = ageDays;
            
            resultElement.classList.add('show');
        }
        
        function showError(message) {
            const errorElement = document.getElementById('error');
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
        
        // Allow Enter key to trigger calculation
        document.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                calculateAge();
            }
        });
        
        // Prevent invalid input
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.addEventListener('input', function() {
                if (this.value.length > 4 && this.id === 'year') {
                    this.value = this.value.slice(0, 4);
                }
                if (this.value.length > 2 && this.id !== 'year') {
                    this.value = this.value.slice(0, 2);
                }
            });
        });