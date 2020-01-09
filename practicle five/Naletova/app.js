/**
 * Цель работы
 * 1) Создать приложение по учету бюджета на месяц
 * 2) Получить навыки применения классов в JavaScript
 * 
 * Задание
 * Нужно реализовать приложение так, чтобы функционал был разделен между тремя классами.
 * Обязанности классов:
 * - UIController отвечает за отрисовку и управляет DOM-документом.
 *      Предоставляет методы, с помощью которых другой объект может управлять DOM-документом.
 * - BudetController отвечает за подсчет и сохранение данных бюджета.
 *      Хранит в себе информацию о внесенных пользоваелем доходах и расходах.
 *      Предоставляет методы, с помощью которых другой объект может получать информацию о бюджете.
 * - GlobalController управляет всем ходом приложения. Говорит что и в какой последовательности делать объектам двух других классов.
*/

/**
 * Отвечает за интервейс пользователя
 * @class
 */
class UIController {

    constructor(){
        this.dobavit = document.querySelector('.add__btn'); //Кнопка добавления элемента
        this.raslits = document.querySelector('.expenses__list'); //Лист с расходами
        this.addlits = document.querySelector('.income__list'); //Лист с доходами
        this.mesyear = document.querySelector('.budget__title--month'); //Месяц
    }
    //Метод добавления блока
    /**Действия при нажатии кнопки добавления */
    BlockAdd (oper, opisanie, money, kol) { //Вводится операция с деньгами, описание, количество
        let count;
        //Какое дествие совершается (добавление или списание)
        if (oper == "inc"){ //Определяет какое действие выбрано
            //если выбрано добавление денег
            if (document.querySelector('.item.clearfix') == null){ //Если в доходах нет ничего
                count = 0;
                //Добавляется код HTML в эллемент с классом income__list в самый конец блока 
                document.querySelector('.income__list').insertAdjacentHTML('beforeend',
            `<div class="item clearfix" id="income-${count}">
                <div class="item__description">${opisanie}</div>
                    <div class="right clearfix">
                        <div class="item__value">+ ${money}</div>
                            <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`)
            }
            else { //Если в доходах есть что-то
               count = document.querySelector('.item.clearfix').getAttribute('id');
                count = Number(count.split('-')[1]); 
                    while (document.getElementById(`income-${count}`) != null){ //Просмотр эллементов в списке доходов
                        count +=1; //Если эллемент с таким номер есть, то идём дальше
                    }
            //Добавляем блок в графу доходов
            document.querySelector('.income__list').insertAdjacentHTML('beforeend',
        `<div class="item clearfix" id="income-${count}">
                <div class="item__description">${opis}</div>
                    <div class="right clearfix">
                        <div class="item__value">+${deneg}</div>
                            <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
        </div>`)
            }
        }
        else if (oper == "exp"){ //Операции в случае вычитания расходов
            if (document.querySelector('.item.clearfix') == null){ //Если в расходах нет ничего
                count = 0;
                //Добавляется код HTML в эллемент с классом expenses__list в самый конец блока 
                document.querySelector('.expenses__list').insertAdjacentHTML('beforeend',
            `<div class="item clearfix" id="expense-${count}">
                <div class="item__description">${opisanie}</div>
                    <div class="right clearfix">
                        <div class="item__value">-${money}</div>
                        <div class="item__percentage">${(100*money/kol).toFixed(2)}</div>
                        <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`)
            }
            else { //Если в доходах есть что-то
               count = document.querySelector('.item.clearfix').getAttribute('id');
                count = Number(count.split('-')[1]);   
                    while (document.getElementById(`expense-${count}`) != null){ //Просмотр эллементов в списке доходов
                        count +=1; //Если эллемент с таким номер есть, то идём дальше
                    }
            //Добавляем блок в графу расходов
            document.querySelector('.expenses__list').insertAdjacentHTML('beforeend',
        `<div class="item clearfix" id="expense-${count}">
                <div class="item__description">${opisanie}</div>
                    <div class="right clearfix">
                        <div class="item__value">-${money}</div>
                        <div class="item__percentage">${(100*money/kol).toFixed(2)}%</div>
                        <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
        </div>`)
            }

        }

        return count;
    }
    /**
     * Метод обновления процентов в списке расходов
     */
    Obnovl(vse){
        let obnov = document.querySelector('.item.clearfix').getAttribute('id');
        obnov = Number(obnov.split('-')[1]);   
            while (document.getElementById(`expense-${obnov}`) != null){ //Просмотр эллементов в списке доходов
                //Обращение к классу процентов с ID каждого элемента
                let proc = -100*Number(document.getElementById(`expense-${obnov}`).querySelector('.item__value').textContent)/kol;
    document.getElementById(`expense${obnov}`).querySelector('.item__percentage').textContent = `${proc.toFixed(2)}%`;   
                //console.log(document.getElementById(`expense-${obnov}`));
                obnov +=1; //Если эллемент с таким номер есть, то идём дальше
            }

    }

    //Метод добавления общих доходов и расходов на экран
    /**Метод вывода денег на экран */
    AllAdd(money,poteryal){

        document.querySelector('.budget__value').textContent = `${(money - potratil).toFixed(2)}`;
        document.querySelector('.budget__income--value').textContent = `${money.toFixed(2)}`;
        document.querySelector('.budget__expenses--value').textContent = `${poteryal.toFixed(2)}`;
        document.querySelector('.budget__expenses--percentage').textContent = `${(100*(poterayl/money)).toFixed(2)}%`;
    }
    /**
     * Уладение блока с экрана
     */
    Delblock(gde){ //Получает параметры цели для удаления с экрана
        //Удаление блока с опирацией
        gde.target.closest('.item.clearfix').remove();
    }

    /**
     * Отображение месяца
     */
    Nov(mesyear){
        let mes=[
               'Январь',
               'Февраль',
               'Март',
               'Апрель',
               'Май',
               'Июнь',
               'Июль',
               'Август',
               'Сентябрь',
                'Октябрь',
               'Ноябрь',
               'Декабрь',]
        this.mesyac.textContent = mes[mesyear];
    }
}

/**
 * Отвечвает за учет бюджета
 * @class
 */
class BudgetController {

    //Конструктор класса бюджета
    constructor(){

        this.AllDoh = 0; //Весь доход
        this.AllRas = 0; //Весь расход
        this.Doh = []; //Доходы
        this.Ras = []; //Расходы

    }

    //Получение денег
    /**Добавление денег в массив с доходами и в общий доход */
    BigMoney (ZP, i) {

        this.AllDoh += ZP; //Запись в общие доходы
        if(this.Doh[0] == null){ //Если в бюджете пусто
            this.Doh[0] = ZP
        }
        else{
            this.Doh[i] = ZP; //Одоразовый доход
        }      
    }
    //Расход денег
    /**Добавление денег в массив с растратами и общие растраты */
    LitMoney (Ras, i) {

        this.AllRas += Ras; //Запись в общие расходы
        
        if(this.Ras[0] == null){ //Если в бюджете пусто
            this.Ras[0] = Ras
        }
        else{
            this.Ras[i] = Ras; //Одоразовый доход
        }      
    }

    /**
     * Удаление из массива с данными
     * @param {Сколько убрали из сводки} Elem 
     * @param {номере элемента в списке} i 
     */
    DelDoh (Elem, i) {

        this.AllDoh -= Elem; //Вычесть из общего
        delete this.Doh[i]; //Удалить эелемент
    }

    /**
     * Удаление из массива с данными
     * Так как расоходы имеют отрицательное значение, просиодит сложение элементов
     * @param {Сколько убрали из сводки} Elem 
     * @param {номере элемента в списке} i 
     */
    DelRas (Elem, i) {
        
        this.AllRas += Elem; //Вычесть из общего 
        delete this.Ras[i]; //Удалить элемент
    }

}


/**
 * Говорит как UIController И BudgetController взаимодействуют друг сдругом
 * @class
 */
class GloablController {

    /**
     * @type {UIController}
     * @property
     */
    uiController;

    /**
     * @type {BuddgetController}
     * @property
     */
    budgetController;


    /**
     * 
     * @param {UIController} uiCtrl 
     * @param {BudgetController} budgetCtrl 
     */
    constructor (uiCtrl, budgetCtrl) {

        this.uiController = uiCtrl;
        this.budgetController = budgetCtrl;
    }
    /**Работа кнопки добавить*/ 
    butadd() {
        this.uiController.dobavit.addEventListener('click', (e) => //Такой синтаксис позволяет обращатсья к классу uiController через this
            {
                let perem = document.querySelector('.add__type').selectedOptions[0].value; //Считывание операции
                let chto = document.querySelector('.add__description').value; //Считывание описания опирации
                let skolko = Number(document.querySelector('.add__value').value);  //Число денег
                let vsego = Number(document.querySelector('.budget__income--value').textContent);//Всего денег в доходах
                let listid; //Запоминаем ID последнего добавления
                listid = this.uiController.BlockAdd(perem, chto, skolko, vsego);
                if (perem == 'inc'){ //Определяем вид операции
                    //Передаём ID операции и количество денег в массив данных с деньгами
                    this.budgetController.BigMoney(skolko, listid);
                }
                else{
                    this.budgetController.LitMoney(skolko, listid);
                }
            //Вызов метода добавления бюджета на экран
            this.uiController.AllAdd(this.budgetController.AllDoh, this.budgetController.AllRas);
            //Вызов метода обновления процентов
            this.uiController.Obnovl(vsego);
            }
        );
    }
    /**Делигация событий удаления из списка расходов*/
    rasdel() {
        this.uiController.raslits.addEventListener('click', (e) =>
            {
               if(e.target.closest('.item__delete')){ //Когда целью становится иконка для удаления, находим ближайший класс с именем .item__delete
                    let money = Number(e.target.closest('.item__delete').previousElementSibling.previousElementSibling.textContent);
                    let indef = e.target.closest('.item.clearfix').getAttribute('id');
                    indef = Number(indef.split('-')[1]); 

                    if (e.target.closest('.expenses') != null){
                        this.budgetController.DelRas(money, indef);
                    }
                    this.uiController.Delblock(e);
               }
            //Вызов метода добавления бюджета на экран
            this.uiController.AllAdd(this.budgetController.AllDoh, this.budgetController.AllRas);
            let vsego = Number(document.querySelector('.budget__income--value').textContent);//Всего денег в доходах
            //Вызов метода бновления процентов в листе расходов
            this.uiController.Obnovl(vsego);
            });
    }
    /**Делигация событий удаления из списка доходов*/
    adddel() {
        this.uiController.addlits.addEventListener('click', (e) =>
            {
                if(e.target.closest('.item__delete')){ //Когда целью становится иконка для удаления, находим ближайший класс с именем .item__delete
                    let money = e.target.closest('.item__delete').previousElementSibling.textContent;
                    money = Number(deneg.split('+')[1]);
                    let indef = e.target.closest('.item.clearfix').getAttribute('id');
                    indef = Number(indef.split('-')[1]); 

                    if (e.target.closest('.income') != null){
                        this.budgetController.DelDoh(money, indef);
                    }
                    this.uiController.Delblock(e);
               }
            //Вызов метода добавления бюджета на экран
            this.uiController.AllAdd(this.budgetController.AllDoh, this.budgetController.AllRas);   
            let vsego = Number(document.querySelector('.budget__income--value').textContent);//Всего денег в доходах        
            //Вызов метода бновления процентов в листе расходов
            this.uiController.Obnovl(vsego);      
            });
    }
}
let ui = new UIController();
let bud = new BudgetController();
let glob = new GloablController(ui,bud);
//Класс для обращения к дате
let date = new Date;
ui.AllAdd(bud.AllDoh,bud.AllRas);
glob.butadd();
glob.rasdel();
glob.adddel();
//Вызов метода отображения месяца
glob.uiController.Nov(date.getMonth());




