(function() {
    
    listOfStringsForm('add-spot', 'spots-list', 'spots');

    function listOfStringsForm(addButtonId, listContainerId, listName) {
        var addItem = document.getElementById(addButtonId);
        var listContainer = document.getElementById(listContainerId);

        for (let x = 0; x < listContainer.children.length; x++) {
            listContainer.children[x].children[1].addEventListener('click', removeClicked);
        }

        return {
            listContainer: listContainer,
            addItem: addItem,
            clickEvent: addItem.addEventListener('click', addItemClicked)
        };

        function addItemClicked(event) {
            event.preventDefault();
            var id = listContainer.children.length;

            var div = document.createElement('div');
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('name', listName + '[' + id + ']');
            var remove = document.createElement('a');
            remove.setAttribute('data-id', id);
            remove.addEventListener('click', removeClicked);
            remove.innerText = '×';

            div.appendChild(input);
            div.appendChild(remove);
            listContainer.appendChild(div);
        }

        function removeClicked(event) {
            event.preventDefault();
            var id = this.getAttribute('data-id');
            var listContainer = document.getElementById(listContainerId);
            listContainer.removeChild(listContainer.children[id]);
            for (let i = 0; i < listContainer.children.length; i++) {
                listContainer.children[i].children[0].setAttribute('name', listName + '[' + i + ']');
                listContainer.children[i].children[1].setAttribute('data-id', i);
            }
        }
    }

})();