-- Init Stub Quiz
INSERT INTO QUIZ (ID, DESCRIPTION, NAME)
VALUES ('stub', 'First Quiz', 'Dummy quiz for stubbing purposes');

INSERT INTO QUIZ_QUESTION_LIST (QUIZ_ID, QUESTION_TEXT, ANSWERS, CORRECT_ANSWER)
VALUES ('stub',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a volutpat neque. In a ligula in tortor varius porttitor in id magna. Cras vitae fringilla quam. Aenean et nunc leo. Cras facilisis, magna id vulputate interdum, magna turpis vehicula mi, id blandit purus felis et tortor. In scelerisque dapibus leo mollis rhoncus. Maecenas at nunc nec arcu aliquam malesuada. Mauris commodo, massa quis semper congue, erat urna suscipit arcu, ac vestibulum augue sem luctus dolor. Sed ultrices non lectus vitae efficitur.',
        ARRAY['1', '2', '3', '4'],
        '1'
        );

INSERT INTO QUIZ_QUESTION_LIST (QUIZ_ID, QUESTION_TEXT, ANSWERS, CORRECT_ANSWER)
VALUES ('stub',
        'Suspendisse pulvinar fringilla interdum. Quisque rutrum commodo augue sit amet lobortis. Integer faucibus ligula quis augue pellentesque, eget consectetur velit pharetra. Aliquam molestie eu felis eget fermentum. Fusce interdum lacus id purus faucibus sollicitudin. Etiam viverra lobortis tempor. Integer arcu erat, porta quis risus id, malesuada efficitur tortor. Etiam fermentum, mauris vel porttitor ornare, justo urna cursus nisl, quis luctus justo sem in nisi. Nunc commodo ligula nec ante maximus tincidunt. Proin purus purus, eleifend eget tortor vel, bibendum eleifend augue. Mauris aliquet lectus leo, eu eleifend dui lacinia sed. Quisque in neque et erat mattis pulvinar.',
        ARRAY['A', 'B', 'C', 'D'],
        'B'
       );

INSERT INTO QUIZ_QUESTION_LIST (QUIZ_ID, QUESTION_TEXT, ANSWERS, CORRECT_ANSWER)
VALUES ('stub',
        'Fusce eu urna non ipsum facilisis ultricies. Aliquam gravida massa a odio varius feugiat. In iaculis ornare sapien et fringilla. Praesent condimentum libero nulla, a suscipit diam iaculis et. Morbi sem nisi, blandit sit amet est quis, eleifend consectetur dolor. Mauris accumsan lectus vel dolor rhoncus, sed mattis tortor hendrerit. Ut malesuada sapien id lectus pulvinar, at tempus velit maximus. Integer quis placerat enim, vitae sagittis ex. Integer ornare est a faucibus euismod. Etiam at ex id turpis feugiat vehicula.',
        ARRAY['I', 'II', 'III', 'IV'],
        'III'
       );

INSERT INTO QUIZ (ID, DESCRIPTION, NAME)
VALUES ('stub2', 'Second Quiz', 'Another dummy quiz for stubbing purposes');

INSERT INTO QUIZ_QUESTION_LIST (QUIZ_ID, QUESTION_TEXT, ANSWERS, CORRECT_ANSWER)
VALUES ('stub2',
        'Maecenas pulvinar erat sit amet tempus hendrerit. Vestibulum eget interdum erat, ut convallis risus. Ut ac ultricies lacus. Vestibulum mattis odio id nisl suscipit elementum. Maecenas pretium bibendum erat, vel eleifend justo. Ut quis lorem leo. Maecenas porttitor rutrum purus ac volutpat. Ut quis nisi id lacus mollis varius.',
        ARRAY['Lorem', 'ipsum', 'dolor', 'sit'],
        'Lorem'
       );

INSERT INTO QUIZ_QUESTION_LIST (QUIZ_ID, QUESTION_TEXT, ANSWERS, CORRECT_ANSWER)
VALUES ('stub2',
        'Vestibulum facilisis, leo sed molestie convallis, felis neque elementum arcu, sed porta justo quam non quam. Aenean bibendum mattis bibendum. Integer vel vulputate elit. Phasellus cursus ligula et imperdiet tincidunt. Fusce tristique tempus eleifend. Nunc maximus neque id metus sodales maximus. Curabitur a tellus arcu. Maecenas interdum risus ac nibh accumsan, eu aliquam velit suscipit. Cras nibh mauris, tincidunt eget facilisis eu, efficitur a tellus. Vivamus libero eros, gravida at ligula eu, congue dictum lorem.',
        ARRAY['foo', 'bar', 'abc', 'xyz'],
        'foo'
       );

INSERT INTO QUIZ_QUESTION_LIST (QUIZ_ID, QUESTION_TEXT, ANSWERS, CORRECT_ANSWER)
VALUES ('stub2',
        'Sed ut consectetur nibh, a vehicula quam. Sed eleifend velit dolor, ut elementum nulla vehicula eu. Phasellus a bibendum est, a iaculis risus. Proin porta, ipsum quis tincidunt iaculis, felis nunc ultrices urna, bibendum pellentesque nisi neque in elit. Pellentesque ut dictum turpis, consectetur volutpat purus. Suspendisse nisi sapien, convallis at accumsan ut, placerat vel velit. Proin a nisl magna. Quisque venenatis blandit maximus.',
        ARRAY['Alice', 'Bob', 'Eve', 'Chuck'],
        'Eve'
       );

