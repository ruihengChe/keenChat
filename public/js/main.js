function onSubmit(e) {
    e.preventDefault();
    
    document.querySelector('.msg').textContent = '';
    document.querySelector('#image').src = '';

    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if(prompt === ''){
        alert('Prompt cannot be empty');
        return;
    }
    console.log(prompt, size);
    GenerateImageRequest(prompt, size);
}

// 新增GenerateIamageRequest()函数
async function GenerateImageRequest(prompt, size) {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt, size }),
        });

        const data = await response.json();
        const imageUrl = data.data;

        if(!response.ok){
            removeSpinner();
            throw new Error(data.error);
        }

        //dom中显示图片
        document.querySelector('#image').src = imageUrl;
        removeSpinner();

        // return data.data;
    } catch (error) {
        // removeSpinner();
        document.querySelector('.msg').textContent = error.message;
    }
}

function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
}

// document.querySelector('#image-form').addEventListener('submit', onSubmit);
if(document.querySelector('#image-form')){
    document.querySelector('#image-form').addEventListener('submit', onSubmit);
}