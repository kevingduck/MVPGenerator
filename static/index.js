document.addEventListener('DOMContentLoaded', () => {
    const collapsibles = document.getElementsByClassName("collapsible");
    for (let i = 0; i < collapsibles.length; i++) {
        collapsibles[i].addEventListener("click", toggleCollapsible);
    }

    function toggleCollapsible() {
        this.classList.toggle('active');
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    }

    const toggleProjectsButton = document.getElementById('toggle-projects-button');
    toggleProjectsButton.addEventListener('click', toggleProjectsPanel);

    function toggleProjectsPanel() {
        const projectsPanel = document.getElementById('projects-panel');

        if (projectsPanel.style.display === 'none') {
            projectsPanel.style.display = 'block';
            toggleProjectsButton.textContent = 'Hide 🫣';
        } else {
            projectsPanel.style.display = 'none';
            toggleProjectsButton.textContent = 'Projects';
        }
    }

    const sendButton = document.querySelector('.send-button');
    sendButton.addEventListener('click', sendMessage);

    function sendMessage() {
        const inputField = document.querySelector('.input-field');
        const chatArea = document.querySelector('.chat-area');
        const message = inputField.value.trim();

        if (message !== '') {
            addMessage('User', message);
            inputField.value = '';

            const thinkingMessage = addMessage('Assistant', 'Thinking...');

            // Send message to Flask server and receive ChatGPT response
            $.ajax({
                type: 'POST',
                url: '/generate-response',
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify({ input: message, messages: existingMessages }),
                success: function (response) {
                    // Update "Thinking..." message with the actual response
                    thinkingMessage.innerHTML = '<hr><strong>Assistant:</strong><br><p>' + response.message + '</p><hr>';
                    existingMessages = response.messages;
                },
            });
        }
    }

    function addMessage(role, message) {
        const chatArea = document.querySelector('.chat-area');
        const newMessage = document.createElement('div');
        newMessage.innerHTML = '<hr><strong>' + role + ':</strong><br><p>' + message + '</p><hr>';
        chatArea.appendChild(newMessage);
        return newMessage;
    }
});

