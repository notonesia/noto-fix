$(document).ready(function () {
    $('#btnPenempatan').click(function () {
        Swal.fire({
            title: 'Masukan Token',
            text: 'Note : Hanya untuk member yang lolos',
            input: 'text',
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: (token) => {
                return fetch(`https://lpk.mardizu.co.id/p/validasiToken/${token}`)
                    //return fetch(`//localhost/mardizulpkv3/p/validasiToken/${token}`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error(response.form_code)
                        }
                        return response.json()
                    })
                    .catch(error => {
                        Swal.showValidationMessage(
                            `Token tidak valid`
                        )
                    })
            },
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.value) {
                Swal.fire({
                    title: 'Token Valid',
                    text: 'Klik Ok Untuk Melanjutkan',
                    icon: 'success',
                }).then(function () {
                    //window.location.href = `//localhost/mardizulpkv3/p/redirect_token/${result.value.id_code}`
                    window.location.href = `https://lpk.mardizu.co.id/p/redirect_token/${result.value.id_code}`
                });
            }
        })
    });
});