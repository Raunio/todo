CREATE USER default_user WITH PASSWORD 'pass';
CREATE DATABASE todo;
GRANT ALL PRIVILEGES ON DATABASE todo TO default_user;
\connect todo default_user
BEGIN;
COMMIT;

CREATE TABLE IF NOT EXISTS account (
    id INT NOT NULL PRIMARY KEY,
    name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    version INT,
    UNIQUE(name)
);

CREATE TABLE IF NOT EXISTS task (
  id INT NOT NULL,
  account_id INT NOT NULL,
  is_done BOOLEAN,
  task_description varchar(200) NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_account
      FOREIGN KEY(account_id)
    REFERENCES account(id)
);