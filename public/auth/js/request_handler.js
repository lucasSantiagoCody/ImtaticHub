const forms = document.querySelectorAll('form')

forms.forEach( form => {
    
    form.addEventListener('submit', async (event) => {
        event.preventDefault()

        const overlaySpinloaderDiv = document.querySelector('.overlay')
        overlaySpinloaderDiv.style = 'display: flex;'

        const formData = new FormData(form)
        const data = Object.fromEntries(formData.entries())
        
        try {
            await fetch(form.action, {
                method: form.method,
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(data)
            }).then(async (response) => {
            const result = await response.json()
        
            if ( response.ok ) {
                throwMessage( result.message, { ok: true } )

                setTimeout(() => {
                    authRedirect(form)
                }, 2000);

            } else {
                throwMessage( result.message, { ok: false } )
            }

            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                setTimeout(() => {
                    $('.overlay').fadeOut(500)
                }, 500)
            })
        } catch(err) {
            console.log(err)
        }
    })
})


