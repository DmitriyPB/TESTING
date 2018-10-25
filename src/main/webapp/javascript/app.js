const button = document.getElementsByClassName('js-button')[0];
const field = document.getElementsByClassName('js-field')[0];
const table = document.getElementsByClassName('list')[0];

const buildItem = (is_answered, title, profile_image, ownerName, link, creationDate) => {
    return `<tr class="${is_answered}">
            <td>
                <time class='list__time'>${creationDate}</time>
            </td>
            <td><a class='list__title' href="${link}" target='_blank'>${title}</a></td>
            <td>
                <div class='list__bio bio'>
                    <img class='bio__image' src="${profile_image}">
                    <h2 class='bio__name'>${ownerName}</h2>
                </div>
            </td>
        </tr>`;
};

const applyList = (arr) => {
    table.innerHTML = "";

    table.insertAdjacentHTML(
        "beforeend",
        "<tr>\n" +
        "    <th>Date</th>\n" +
        "    <th>Question</th>\n" +
        "    <th>Who posted</th>\n" +
        "  </tr>"
    );

    if (!arr) {
        return
    }

    for (let i = 0; i < arr.length; i++) {
        let json = arr[i];
        let creationDate = moment.utc(json.creation_date * 1000).format('LL');
        let title = json.title;
        let ownerName = json.owner.display_name;
        let profile_image = json.owner.profile_image;
        let link = json.link;
        let is_answered = json.is_answered ? "answered" : "not-answered";

        table.insertAdjacentHTML(
            'beforeend',
            buildItem(is_answered, title, profile_image, ownerName, link, creationDate)
        );
    }
};

const badRequest = () => {
    alert("Something went wrong")
};

button.addEventListener('click', function (e) {
        e.preventDefault();
        fetch(`https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${field.value}&site=stackoverflow`, {method: 'GET'})
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                badRequest();
            })
            .then(response => {
                applyList(response.items);
            });
    }
);