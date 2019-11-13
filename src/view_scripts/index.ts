const inputCountry = document.getElementById('countryInput')
if (inputCountry) {
    inputCountry.addEventListener('focus', function() {
        const dropdown = document.getElementById('dropdown')
        if (dropdown) {
            dropdown.style.display = 'block'
        }
    })
    inputCountry.addEventListener('blur', function() {
        const dropdown = document.getElementById('dropdown')
        if (dropdown) {
            setTimeout(function() {
                dropdown.style.display = 'none'
            }, 100)
        }
    })
}
