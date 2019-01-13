# Game of Chance: An Ionic Project
by **Qin Yu** only (Incl. all graphics and music), Feb 2016. 

Demo is [here](https://youtu.be/KcRU7ztx358).

[![GitHub license](https://img.shields.io/badge/license-MIT-yellow.svg)](https://github.com/qin-yu/ml-julia-boston-housing/blob/master/LICENSE)
[![Ionic](https://img.shields.io/badge/Ionic-v1.1.1-blue.svg)](https://ionicframework.com)
[![AngularJS](https://img.shields.io/badge/JavaScript-AngularJS-red.svg)](https://angularjs.org)
  
**Games of Chance** is an online casino developed for Experimental Psychology in PALS. It is designed to help researches that explores social, legal and economic decision-making.

## Overview
It integrates 8 such games of chance, allowing real-time play against other app users, or against the software. All games are very simple, and include things like the trust game (very famous game in behavioural economics involving choosing an investor). A user can log into the app and choose to play, track their past performances, and view other people’s performances. All games are played for real money. Moreover, users will have the option of competing against real other people, or playing against computer algorithms.

Specifically, users of the app can choose to play any of the following 8 games (see more detailed descriptions below).
1.	Trust Game
2.	Public Goods Game
3.	Ultimatum Game
4.	Probability Gambling Game
5.	Time guessing Game
6.	Beauty Contest Game
7.	Rock guessing game
8.	Charity Game

![ui_overview](/imageForDemo/uiOverviewTeam10_12Mar2016_Qin.jpg "UI Overview")

### Trust game (very famous game in behavioural economics)
- Trust game (investor):
This game measures how much one person trusts another to return an investment. In this version, players will decide both how much to invest and whether or not return investments. Players will be endowed with £3, £4, £5, £6, £7, £8, £9, and £10. They will be told that they could invest any amount of each endowment with another player. Any money invested will be tripled, giving the other player the opportunity to return some of the profits to the player. Therefore, investment can lead to increased profits.
- Trust game (trustee):
Trustees will be offered investments. They will be told that these amounts represent the tripled value of another player’s investment with them. The player must therefore decide how much, if any of the amount, they will return to that investor.

### Charity Game
This game measures generosity to charities. Participants will be asked to donate some of their profits to one of a number of charity organisations. This can occur via a prompt once a week.

### Public Goods
This game measures conformity to norms and free-riding. Players can invest between £1 and £10 to a public fund. Four other players also have the opportunity to invest. Each round, money contributed to this fund is tripled, before being distributed equally amongst the five other players, regardless of their individual contributions. However, all players will be aware of who contributed what, and have the option of punishing that player by subtracting money from their share of the profits from the fund. To do so, each player simply has to spend money from his or her own profit. For every £0.10 spent, £1 will be removed from the punished player.

![public_goods_game_n_time_estimation_game_1](/imageForDemo/demonstration1_23Mar_Qin.png)
![public_goods_game_n_time_estimation_game_2](/imageForDemo/demonstration2_23Mar_Qin.png)

### Ultimatum
- Ultimatum (offerer):
This game measures fairness and reactions to perceived unfairness. Players will be asked to share £10 with another player. The other player can accept the proposed split, in which case both players get the sum of money, or the other player can reject the proposed split, in which case neither player received any money.
- Ultimatum (receiver): 
Players will also make decisions in the other role. They must decide whether to accept or reject each proposed split.

### Probability. 
This game measure loss aversion, allowing computation of a loss aversion lambda. Each player will invest £5 to play this game. Participants will decide whether to bet on a series of 10 gambles with varying degrees of risk, or take a sure loss or gain. For instance, participants may be offered a gamble where there is an 80% chance of winning £2, or a 20% chance of losing £2, or a sure change of gaining €0.40. The exact probability values range between 90%-10% and 50%-50%, while the won/loss values will range from £1 - £5. The sure bet values will range from £0.10 to £1. Participants will receive feedback on the outcome of their choices.

### Beauty Contest. 
This game measure meta-cognition and mental state inferences. Players are tasked with guessing a number between 0 – 100. Participants must invest 31 to play. They will be told that other participants are also registering guesses, and the winning estimate is the number that is closest to 2/3 the average number guessed. So if all players, on average, guessed 51, then the winning number is 34. In this game, players can think about what the average guess might be, then think that each person may adopt this strategy, therefore each players’ guess may be 2/3 of that value. But if each player adopts this strategy, then an astute player may decide that 2/3 of 2/3 of the perceived average is correct, and so on. Therefore, the smaller the number, most meta-cognition and mental state inferences can be inferred. Participants will only make one guess in this game. Accurate guesses will be rewarded (win £5). The accuracy depends on the number of other players involved each round.

### Time Estimation. 
This game is simply a measure of players’ ability to estimate how long period of time take to elapse. Players must invest £1 to play. Players will press a button to start and stop an estimate of an interval of time (e.g. 9.5 seconds). They will receive feedback for correct guesses. They will estimate times ranging between 5 – 15 seconds. This game will be played competitively against other people, and the person with the highest number of accurate responses out of 10 is given the £5 reward.

### Rock Guessing. 
This game is simply a measure of players’ ability to estimate quantity. They will be shown one of 30 different images on screen depicting rocks of different size. Each image will be displayed for 2 seconds. Players must guess how many rocks are on each screen. They will receive feedback after each estimate. Actual numbers will range between 200-500 rocks. They must pay £1 to play, and like the time estimation, will compete against others. The person with the most wins gets the £5 reward.
