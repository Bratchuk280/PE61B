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
        this.dobavit = document.querySelector('.add__btn'); 
        this.raslits = document.querySelector('.expenses__list'); 
        this.addlits = document.querySelector('.income__list'); 
        this.mesyac = document.querySelector('.budget__title--month'); 
    }

    //Метод добавления блока
    /**Действия при нажатии кнопки добавления */
    BlockAdd (oper, opis, deneg, vse) { 
        let count;
        if (oper == "inc"){ 
            if (document.querySelector('.item.clearfix') == null){ 
                count = 0;
                //document.getElementById('.item.clearfix').insertAdjacentHTML(`<div class="item clearfix" id="income-${count}">`);
                //Добавляется код HTML в эллемент с классом income__list в самый конец блока 
                document.querySelector('.income__list').insertAdjacentHTML('beforeend',
            `<div class="item clearfix" id="income-${count}">
                <div class="item__description">${opis}</div>
                    <div class="right clearfix">
                        <div class="item__value">+ ${deneg}</div>
                            <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`)
            }
            else {
               count = document.querySelector('.item.clearfix').getAttribute('id');
                count = Number(count.split('-')[1]); 
                    while (document.getElementById(`income-${count}`) != null){
                        count +=1; 
                    }
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
        else if (oper == "exp"){ 
            if (document.querySelector('.item.clearfix') == null){ 
                count = 0;
                //Добавляется код HTML в эллемент с классом expenses__list в самый конец блока 
                document.querySelector('.expenses__list').insertAdjacentHTML('beforeend',
            `<div class="item clearfix" id="expense-${count}">
                <div class="item__description">${opis}</div>
                    <div class="right clearfix">
                        <div class="item__value">-${deneg}</div>
                        <div class="item__percentage">${(100*deneg/vse).toFixed(2)}</div>
                        <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`)
            }
            else { 
               count = document.querySelector('.item.clearfix').getAttribute('id');
                count = Number(count.split('-')[1]);   
                    while (document.getElementById(`expense-${count}`) != null){ 
                        count +=1; 
                    }
            document.querySelector('.expenses__list').insertAdjacentHTML('beforeend',
        `<div class="item clearfix" id="expense-${count}">
                <div class="item__description">${opis}</div>
                    <div class="right clearfix">
                        <div class="item__value">-${deneg}</div>
                        <div class="item__percentage">${(100*deneg/vse).toFixed(2)}%</div>
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
     * Метод обновления процентов в списке расзодов
     */
    Obnovl(vse){
        let obnov = document.querySelector('.item.clearfix').getAttribute('id');
        obnov = Number(obnov.split('-')[1]);   
            while (document.getElementById(`expense-${obnov}`) != null){ 
                let proc = -100*Number(document.getElementById(`expense-${obnov}`).querySelector('.item__value').textContent)/vse;
                document.getElementById(`expense-${obnov}`).querySelector('.item__percentage').textContent = `${proc.toFixed(2)}%`;   
                obnov +=1; 
            }

    }

    //Метод добавления общих доходов и расходов на экран
    /**Метод вывода суммы денег на экран */
    AllAdd(deneg, potratil){

        document.querySelector('.budget__value').textContent = `${(deneg - potratil).toFixed(2)}`;
        document.querySelector('.budget__income--value').textContent = `${deneg.toFixed(2)}`;
        document.querySelector('.budget__expenses--value').textContent = `${potratil.toFixed(2)}`;
        document.querySelector('.budget__expenses--percentage').textContent = `${(100*(potratil/deneg)).toFixed(2)}%`;
    }
    /**
     * Уладение блока с экрана
     */
    Delblock(gde){
        gde.target.closest('.item.clearfix').remove();
    }

    /**
     * Отображение месяца
     */
    Nov(prinyal){
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
        this.mesyac.textContent = mes[prinyal];
    }
}

/**
 * Отвечвает за учет бюджета
 * @class
 */
class BudgetController {

    //Конструктор класса бюджета
    constructor(){

        this.AllDoh = 0; 
        this.AllRas = 0; 
        this.Doh = []; 
        this.Ras = []; 

    }

    //Получение денег
    /**Добавление денег в массив с доходами и в общий доход */
    BolsheDeneg (Zarplata, i) {

        this.AllDoh += Zarplata; 
        if(this.Doh[0] == null){ 
            this.Doh[0] = Zarplata
        }
        else{
            this.Doh[i] = Zarplata; 
        }      
    }

   
    /**Добавление денег в массив с растратами и общие растраты */
    MensheDeneg (Rastrata, i) {

        this.AllRas += Rastrata; 
        
        if(this.Ras[0] == null){ 
            this.Ras[0] = Rastrata
        }
        else{
            this.Ras[i] = Rastrata; 
        }      
    }

    /**
     * Удаление из массива с данными
     * @param {Сколько убрали из сводки} Elem 
     * @param {номере элемента в списке} i 
     */
    DelDoh (Elem, i) {

        this.AllDoh -= Elem; 
        delete this.Doh[i]; 
    }

    /**
     * Удаление из массива с данными
     * @param {Сколько убрали из сводки} Elem 
     * @param {номере элемента в списке} i 
     */
    DelRas (Elem, i) {
        
        this.AllRas += Elem; 
        delete this.Ras[i]; 
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
                let perem = document.querySelector('.add__type').selectedOptions[0].value; 
                let chto = document.querySelector('.add__description').value; 
                let skolko = Number(document.querySelector('.add__value').value); 
                let vsego = Number(document.querySelector('.budget__income--value').textContent);
                let listid; 
                listid = this.uiController.BlockAdd(perem, chto, skolko, vsego);
                if (perem == 'inc'){ 
                    this.budgetController.BolsheDeneg(skolko, listid);
                }
                else{
                    this.budgetController.MensheDeneg(skolko, listid);
                }
            this.uiController.AllAdd(this.budgetController.AllDoh, this.budgetController.AllRas);
            this.uiController.Obnovl(vsego);
            }
        );
    }
    rasdel() {
        this.uiController.raslits.addEventListener('click', (e) =>
            {
               if(e.target.closest('.item__delete')){ 
                    let deneg = Number(e.target.closest('.item__delete').previousElementSibling.previousElementSibling.textContent);
                    let indef = e.target.closest('.item.clearfix').getAttribute('id');
                    indef = Number(indef.split('-')[1]); 

                    if (e.target.closest('.expenses') != null){
                        this.budgetController.DelRas(deneg, indef);
                    }
                    this.uiController.Delblock(e);
               }
            this.uiController.AllAdd(this.budgetController.AllDoh, this.budgetController.AllRas);
            let vsego = Number(document.querySelector('.budget__income--value').textContent);
            this.uiController.Obnovl(vsego);
            });

    }
    adddel() {
        this.uiController.addlits.addEventListener('click', (e) =>
            {
                if(e.target.closest('.item__delete')){ 
                    let deneg = e.target.closest('.item__delete').previousElementSibling.textContent;
                    deneg = Number(deneg.split('+')[1]);
                    let indef = e.target.closest('.item.clearfix').getAttribute('id');
                    indef = Number(indef.split('-')[1]); 

                    if (e.target.closest('.income') != null){
                        this.budgetController.DelDoh(deneg, indef);
                    }
                    this.uiController.Delblock(e);
               }
            this.uiController.AllAdd(this.budgetController.AllDoh, this.budgetController.AllRas);   
            let vsego = Number(document.querySelector('.budget__income--value').textContent);
            this.uiController.Obnovl(vsego);      
            });
    }
}
let ui = new UIController();
let bud = new BudgetController();
let glob = new GloablController(ui,bud);
let date = new Date;
ui.AllAdd(bud.AllDoh,bud.AllRas);
glob.butadd();
glob.rasdel();
glob.adddel();
glob.uiController.Nov(date.getMonth());





