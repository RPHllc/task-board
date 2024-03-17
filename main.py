from fastui import App, Button, Container, Header, Modal, TextArea, TextField, Div
import requests

# Define your CSS and JS links
css_links = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",
    "https://use.fontawesome.com/releases/v5.8.1/css/all.css",
    "https://fonts.googleapis.com/css?family=Open+Sans&display=swap",
    "https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css",
    "./assets/css/style.css"  # Assuming this is accessible at this path
]

# Define external JS scripts
js_scripts = [
    "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js",
    "https://code.jquery.com/jquery-3.4.1.min.js",
    "https://code.jquery.com/ui/1.13.1/jquery-ui.min.js",
    "https://cdn.jsdelivr.net/npm/dayjs@1.11.3/dayjs.min.js",
    "./assets/js/script.js"  # Assuming this is accessible at this path
]

app = App(title="Task Board", external_stylesheets=css_links, external_scripts=js_scripts)

@app.route("/")
def index():
    header = Header(children=[
        "Task Board",
        Div("A simple Kanban board for task management", _class="lead")
    ], _class="p-4 mb-4 text-center border-bottom border-5")

    add_task_button = Button("Add Task", _class="btn btn-success", data_bs_toggle="modal", data_bs_target="#formModal")

    # Define the modal for adding tasks
    task_modal = Modal(
        id="formModal",
        title="Add Task",
        body=Div(children=[
            TextField(label="Task Title", id="taskTitle", name="taskTitle", required=True),
            TextField(label="Task Due Date", id="taskDueDate", name="taskDueDate", required=True, _class="form-control"),
            TextArea(label="Task Description", id="taskDescription", name="taskDescription", rows=3),
        ]),
        footer=Button("Add Task", _class="btn btn-primary", id="taskSubmitButton")
    )

    container = Container(children=[
        Div(children=[add_task_button, task_modal], _class="text-center mb-5"),
        # Here you would dynamically generate the task cards based on your backend data
    ])

    return app.layout(header, container)

if __name__ == "__main__":
    app.run(debug=True)
