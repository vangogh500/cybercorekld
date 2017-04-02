const K = 200

exports.calculate = function(elo_one, elo_two, games_one, games_two, winner) {
  var e_one = ( 1.0 / (1.0 + Math.pow( 10, ( (elo_two - elo_one) / 400.0) )))
  var e_two = ( 1.0 / (1.0 + Math.pow( 10, ( (elo_one - elo_two) / 400.0) )))

  var n_one = games_one
  var n_two = games_two

  if(n_one == 0) n_one = 1
  if(n_two == 0) n_two = 1
  if(n_one > 8) n_one = 8
  if(n_two > 8) n_two = 8

  var player_one = Math.round( (K / n_one) * ( (1.0 - winner) - e_one ))
  var player_two = Math.round( (K / n_two) * ( (0.0 + winner) - e_two ))

  return { player_one, player_two }
}
