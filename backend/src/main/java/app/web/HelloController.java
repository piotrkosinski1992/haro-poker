package app.web;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/*
* Don't delete until we create meaningful endpoints. It shows us if backend/frontend communication works on heroku
* */
@RestController
public class HelloController {

    @GetMapping("/hello")
    public Message sayHello() {
        return new Message("Hello from backend!");
    }
}

class Message {

    String content;

    public Message(String content) {
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
