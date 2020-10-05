//khai bao thu vien
const { argv, title } = require('process');
const { string } = require('yargs');
const yargs = require('yargs');
const chalk = require('chalk');
const fs = require('fs');

//khai bao hang 
const error = chalk.bold.red;
const warning = chalk.keyword('orange');


yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'node body',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function(argv){

        console.log(chalk.blue('=============================================='));
        console.log(chalk.blue('saving.......'));
        console.log(chalk.blue('=============================================='));
        /**
         * goi ham mo file
         */
        fs.readFile('./data/notes.json',(err,data)=>{
            if(err){
                console.log(error(err));
                return;
            }
            let note = {
                title: argv.title,
                body: argv.body
            };

            notes = JSON.parse(data);

            //su ly trunf tieu de
            for(let i = 0; i < notes.size;++i){
                if(notes.notes[i].title === note.title){
                    console.log(warning('=============================================='));
                    console.log(warning('Title was exist !. Your note can\'t save'));
                    console.log(warning('=============================================='));
                    return;
                }
            }

            notes.notes.push(note);
            notes.size++;
            notes = JSON.stringify(notes);

            //ham ghi du lieu vao file
            fs.writeFile('./data/notes.json', notes, 'utf8', (err)=>{
                if(err){
                    console.log(error(err));
                    return;
                }
                console.log(chalk.blue('=============================================='));
                console.log(chalk.blue('Add note was success !'));
                console.log(chalk.blue('=============================================='));
            });
        })
        console.log(chalk.magenta('Title: ') + argv.title);
        console.log(chalk.magenta('body: ') + argv.body);
    }
});

yargs.command({
    command: 'delete',
    describe: 'Delete a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function(argv){
        let YN = false;

        console.log(chalk.blue('=============================================='));
        console.log(chalk.blue('Deleting.......'));
        console.log(chalk.blue('=============================================='));
        /**
         * goi ham mo file
         */
        fs.readFile('./data/notes.json',(err,data)=>{
            if(err){
                console.log(error(err));
                return;
            }
            let notes = {
                notes: []
            };

            notes = JSON.parse(data);
            let flat = true;
            //su ly trunf tieu de
            for(let i = 0; i < notes.size; ++i){
                if(notes.notes[i].title === argv.title){
                    notes.notes.splice(i,1);
                    notes.size--;
                    flat = false;
                    break;
                }
            }
            if(flat){
                console.log(warning('=============================================='));
                console.log(warning('Title not exit !'));
                console.log(warning('=============================================='));
                return;
            }
            notes = JSON.stringify(notes);

            //ham ghi du lieu vao file
            fs.writeFile('./data/notes.json', notes, 'utf8', (err)=>{
                if(err){
                    console.log(error(err));
                    return;
                }
                console.log(chalk.blue('=============================================='));
                console.log(chalk.blue('Delete note was success !'));
                console.log(chalk.blue('=============================================='));
            });
        })
        console.log(chalk.magenta('Title: ') + argv.title);
    }
});

yargs.command({
    command: 'update',
    describe: 'Update a note',
    builder: {
        title:{
            describe:'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'node body',
            demandOption: true,
            type: 'string'
        },
    },
    handler: function(argv){

        console.log(chalk.blue('=============================================='));
        console.log(chalk.blue('Updating.......'));
        console.log(chalk.blue('=============================================='));
        /**
         * goi ham mo file
         */
        fs.readFile('./data/notes.json',(err,data)=>{
            if(err){
                console.log(error(err));
                return;
            }
            let note = {
                title: argv.title,
                body: argv.body
            };

            notes = JSON.parse(data);
            let flat = true;
            //su ly trunf tieu de
            for(let i = 0; i < notes.size; ++i){
                if(notes.notes[i].title === argv.title){
                    notes.notes[i].body = argv.body;
                    flat = false;
                    break;
                }
            }
            if(flat){
                console.log(warning('=============================================='));
                console.log(warning('Title not exit !'));
                console.log(warning('=============================================='));
                return;
            }

            //ham ghi du lieu vao file
            fs.writeFile('./data/notes.json', notes, 'utf8', (err)=>{
                if(err){
                    console.log(error(err));
                    return;
                }
                console.log(chalk.blue('=============================================='));
                console.log(chalk.blue('update note was success !'));
                console.log(chalk.blue('=============================================='));
            });
        })
        console.log(chalk.magenta('Title: ') + argv.title);
        console.log(chalk.magenta('body: ') + argv.body);
    }
});

yargs.command({
    command: 'show',
    describe: 'Show all notes',
    handler: function(argv){
        let YN = false;

        console.log(chalk.blue('=============================================='));
        console.log(chalk.blue('Loading.......'));
        console.log(chalk.blue('=============================================='));
        /**
         * goi ham mo file
         */
        fs.readFile('./data/notes.json',(err,data)=>{
            if(err){
                console.log(error(err));
                return;
            }
            let notes = JSON.parse(data);
            for (let i = 0; i < notes.size; ++i ){
                console.log(chalk.greenBright('ID : ') + i);
                console.log(chalk.magenta('Title: ') + notes.notes[i].title);
                console.log(chalk.magenta('body: ') + notes.notes[i].body);
                console.log(chalk.yellow('=============================================='));
            }
        })
    }
});

yargs.argv;